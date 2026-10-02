type KvCommand = (string | number)[];

type TemboMemoryStore = {
  bookings: Map<string, unknown>;
  newsletter: Set<string>;
};

const memoryStore = (() => {
  const scope = globalThis as typeof globalThis & { __temboStore?: TemboMemoryStore };
  if (!scope.__temboStore) scope.__temboStore = { bookings: new Map(), newsletter: new Set() };
  return scope.__temboStore;
})();

async function kvCommand(command: KvCommand) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return { configured: false, result: null };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`KV request failed with ${response.status}`);
  const data = (await response.json()) as { result: unknown };
  return { configured: true, result: data.result };
}

export async function saveBooking(id: string, booking: unknown) {
  const result = await kvCommand(["SET", `tembo:booking:${id}`, JSON.stringify(booking)]);
  if (!result.configured) {
    memoryStore.bookings.set(id, booking);
    return { configured: false, result: "memory" };
  }
  return result;
}

export async function saveNewsletterEmail(email: string) {
  const normalized = email.toLowerCase();
  const result = await kvCommand(["SADD", "tembo:newsletter", normalized]);
  if (!result.configured) {
    memoryStore.newsletter.add(normalized);
    return { configured: false, result: "memory" };
  }
  return result;
}

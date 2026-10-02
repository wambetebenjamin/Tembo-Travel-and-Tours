export function formatKes(value: number) {
  return `KES ${new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0,
  }).format(value)}`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

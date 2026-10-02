import { NextResponse } from "next/server";
import { saveNewsletterEmail } from "@/lib/storage";
import { isValidEmail } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim() || "";
    if (!isValidEmail(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    await saveNewsletterEmail(email);
    return NextResponse.json({ message: "You’re on the list. Asante!" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "We couldn’t add you right now. Please try again." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { generateNarrative } from "@/lib/generator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt = "", mode = "strategi" } = body ?? {};

    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Masukkan konteks atau tujuan terlebih dahulu." },
        { status: 400 }
      );
    }

    const result = generateNarrative({
      prompt,
      mode: ["strategi", "ide", "konten"].includes(mode) ? mode : "strategi"
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Generation error", error);
    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat menghasilkan rekomendasi. Coba beberapa saat lagi."
      },
      { status: 500 }
    );
  }
}

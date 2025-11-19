/* eslint-disable react/no-unescaped-entities */
"use client";

import { useMemo, useState, useTransition } from "react";
import clsx from "classnames";

type Mode = "strategi" | "ide" | "konten";

interface InsightResponse {
  title: string;
  summary: string;
  insights: string[];
  roadmap: {
    phase: string;
    focus: string;
    impact: string;
  }[];
  callToAction: string;
}

const modes: { id: Mode; label: string; description: string }[] = [
  {
    id: "strategi",
    label: "Strategi Bisnis",
    description: "Rancang peta jalan transformasi dan prioritas strategis."
  },
  {
    id: "ide",
    label: "Ide Produk",
    description: "Temukan peluang produk dan value proposition baru."
  },
  {
    id: "konten",
    label: "Konten Kampanye",
    description: "Ciptakan narasi kreatif yang relevan dengan audiens."
  }
];

const placeholders: Record<Mode, string> = {
  strategi:
    "Contoh: Kembangkan strategi ekspansi pasar untuk startup fintech di Asia Tenggara.",
  ide: "Contoh: Temukan ide produk digital untuk membantu UMKM meningkatkan pemasaran online.",
  konten:
    "Contoh: Susun konsep konten kampanye lebaran untuk brand fashion berkelanjutan."
};

export default function Home() {
  const [mode, setMode] = useState<Mode>("strategi");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<InsightResponse | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const placeholder = useMemo(() => placeholders[mode], [mode]);

  const handleSubmit = () => {
    setError(null);
    if (!prompt.trim()) {
      setError("Masukkan konteks atau tantangan yang ingin dipecahkan.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt, mode })
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error ?? "Gagal menghasilkan rekomendasi.");
        }

        const data = (await response.json()) as { data: InsightResponse };
        setResult(data.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi error yang tidak diketahui."
        );
      }
    });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-12 text-slate-100">
      <header>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200 sm:text-sm">
          Aurora AI Studio
        </span>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-6xl">
          Asisten Strategis Cerdas untuk
          <span className="bg-gradient-to-r from-primary-300 via-primary-500 to-primary-200 bg-clip-text text-transparent">
            {" "}
            akselerasi inovasi Anda
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200/90 sm:text-lg">
          Tulis tantangan bisnis, ide produk, atau kampanye konten yang Anda
          inginkan. Aurora akan menganalisis konteks, menyoroti peluang, dan
          menghadirkan roadmap aksi dalam hitungan detik.
        </p>
      </header>

      <section className="grid gap-8 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl lg:grid-cols-[1.2fr_1fr] lg:p-10">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Pilih Mode Fokus
            </h2>
            <p className="mt-2 text-sm text-slate-200/85 sm:text-base">
              Sesuaikan pendekatan AI dengan kebutuhan eksplorasi Anda.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={clsx(
                  "rounded-2xl border px-4 py-3 text-left transition hover:border-primary-400 hover:bg-primary-400/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
                  mode === item.id
                    ? "border-primary-400 bg-primary-400/20"
                    : "border-white/15 bg-white/5"
                )}
              >
                <span className="text-sm font-semibold text-white">
                  {item.label}
                </span>
                <p className="mt-2 text-xs text-slate-100/75 sm:text-sm">
                  {item.description}
                </p>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="prompt"
              className="text-sm font-semibold text-slate-100 sm:text-base"
            >
              Deskripsikan tantangan atau tujuan Anda
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={placeholder}
              className="min-h-[160px] w-full resize-y rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white shadow-inner outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-400/50 sm:text-base"
            />
          </div>
          {error && (
            <div className="rounded-2xl border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs text-slate-200/80 sm:text-sm">
              Aurora menggunakan kombinasi pola strategi dan kreativitas untuk
              memproses konteks Anda.
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition sm:text-base",
                isPending
                  ? "cursor-wait border border-primary-300/60 bg-primary-400/50 text-white/80"
                  : "bg-primary-500 text-white shadow-[0_12px_40px_-20px_rgba(90,113,245,0.8)] hover:bg-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              )}
            >
              {isPending ? "Mengolah..." : "Bangun Rekomendasi"}
            </button>
          </div>
        </div>

        <div className="flex min-h-[340px] flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/30 p-5 shadow-[0_25px_80px_-40px_rgba(90,113,245,0.9)] sm:p-6">
          {result ? (
            <>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary-200/70">
                  Rekomendasi Aurora
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  {result.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-100/80">
                  {result.summary}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-100/60">
                  Sorotan Strategis
                </p>
                <ul className="space-y-3">
                  {result.insights.map((item, index) => (
                    <li
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-slate-100/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-100/60">
                  Roadmap Momentum
                </p>
                <div className="space-y-3">
                  {result.roadmap.map((item) => (
                    <div
                      key={item.phase}
                      className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 px-4 py-3 text-sm text-slate-100/90"
                    >
                      <p className="font-semibold text-white">{item.phase}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary-200/80">
                        {item.focus}
                      </p>
                      <p className="mt-2 text-sm text-slate-100/90">
                        {item.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-primary-500/40 bg-primary-500/15 px-4 py-3 text-sm font-semibold text-primary-100">
                {result.callToAction}
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-slate-100/70">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <span className="text-3xl">✨</span>
              </div>
              <p className="text-lg font-semibold text-white">
                Jelajahi lanskap ide Anda
              </p>
              <p className="max-w-xs text-sm leading-relaxed text-slate-100/75">
                Mulai dengan menuliskan tantangan atau tujuan. Aurora akan
                menghasilkan blueprint strategis yang dapat langsung Anda eksekusi.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

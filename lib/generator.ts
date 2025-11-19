import crypto from "crypto";

type GenerationMode = "strategi" | "ide" | "konten";

interface GenerationInput {
  prompt: string;
  mode: GenerationMode;
}

interface GenerationResult {
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

const lenses = {
  strategi: [
    "Transformasi Digital",
    "Optimasi Operasional",
    "Ekspansi Pasar",
    "Pengalaman Pelanggan",
    "Inovasi Produk"
  ],
  ide: [
    "Produk Baru",
    "Kemitraan Strategis",
    "Model Bisnis",
    "Program Loyalitas",
    "Ekosistem Platform"
  ],
  konten: [
    "Narasi Kampanye",
    "Storytelling Merek",
    "Konten Edukatif",
    "Konten Interaktif",
    "Konten Komunitas"
  ]
};

const tones = [
  "visioner",
  "praktis",
  "futuristik",
  "berorientasi data",
  "berpusat pada manusia"
];

const differentiators = [
  "memanfaatkan insight berbasis data real-time",
  "menggabungkan kecerdasan kolektif dari tim lintas fungsi",
  "mengoptimalkan proses dengan pendekatan adaptif",
  "menghadirkan pengalaman personal berskala besar",
  "mengarahkan keputusan melalui eksperimentasi terukur"
];

const actionVerbs = [
  "Aktifkan",
  "Peta",
  "Prototype",
  "Kalibrasi",
  "Orkestrasi",
  "Sempurnakan",
  "Percepat",
  "Fasilitasi"
];

const impactStatements = [
  "meningkatkan retensi pelanggan secara signifikan",
  "memperkuat posisi merek di pasar sasaran",
  "mengurangi siklus iterasi produk",
  "menciptakan alur onboarding yang lebih intuitif",
  "meningkatkan kepercayaan pemangku kepentingan"
];

const phases = ["Explorasi", "Validasi", "Peluncuran", "Skalasi"];

function hashPrompt(value: string): Buffer {
  return crypto.createHash("sha256").update(value).digest();
}

function seededRandom(seedBuffer: Buffer, scope: string, index: number): number {
  const combined = Buffer.concat([
    seedBuffer,
    Buffer.from(scope, "utf8"),
    Buffer.from([index])
  ]);
  const hash = crypto.createHash("sha256").update(combined).digest();
  return hash.readUInt32BE(0) / 0xffffffff;
}

function pick<T>(seed: Buffer, scope: string, list: readonly T[]): T {
  const r = seededRandom(seed, scope, list.length);
  const idx = Math.floor(r * list.length);
  return list[Math.min(idx, list.length - 1)];
}

function sentenceCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function generateNarrative({
  prompt,
  mode
}: GenerationInput): GenerationResult {
  const normalized = prompt.trim() || "Ide Baru";
  const seed = hashPrompt(`${mode}::${normalized}`); // deterministic per prompt & mode

  const selectedLens = pick(seed, "lens", lenses[mode]);
  const selectedTone = pick(seed, "tone", tones);
  const uniqueEdge = pick(seed, "edge", differentiators);

  const title = `${selectedLens} • ${sentenceCase(normalized)}`;
  const summary = `Pendekatan ${selectedTone} untuk ${normalized} dengan fokus pada ${selectedLens.toLowerCase()} yang ${uniqueEdge}.`;

  const insights = Array.from({ length: 3 }, (_, i) => {
    const verb = pick(seed, `verb-${i}`, actionVerbs);
    const impact = pick(seed, `impact-${i}`, impactStatements);
    return `${verb} inisiatif yang ${impact} melalui orkestrasi ${selectedTone}.`;
  });

  const roadmap = phases.map((phase, idx) => ({
    phase,
    focus: `${phase} ${selectedLens}`,
    impact: `${sentenceCase(
      pick(seed, `impact-phase-${idx}`, impactStatements)
    )}.`
  }));

  const callToAction = `${pick(seed, "cta", actionVerbs)} tim untuk menyelaraskan ${selectedLens.toLowerCase()} dan mempercepat realisasi ${normalized.toLowerCase()}.`;

  return {
    title,
    summary,
    insights,
    roadmap,
    callToAction
  };
}

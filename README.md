# Aurora AI Studio

Aplikasi Next.js untuk membantu tim bisnis dan kreatif menghasilkan rekomendasi strategi, ide produk, dan narasi konten secara instan. Aurora memanfaatkan pola generatif berbasis konteks untuk menyusun insight, roadmap, dan call-to-action yang dapat langsung dieksekusi.

## ✨ Fitur Utama

- **Mode Fokus Dinamis** — pilih antara strategi bisnis, ide produk, atau konten kampanye.
- **Analisis Kontekstual** — input tantangan atau tujuan, Aurora menyusun narasi dan summary adaptif.
- **Sorotan Strategis** — tiga insight utama yang menyoroti peluang dan dampak.
- **Roadmap Momentum** — fase eksplorasi hingga skalasi lengkap dengan fokus dan dampak.
- **Call-to-Action** — rekomendasi langkah lanjutan yang mudah dijalankan bersama tim.

## 📦 Teknologi

- [Next.js 14](https://nextjs.org/) dengan App Router
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) untuk styling responsif

## 🚀 Menjalankan Secara Lokal

```bash
npm install
npm run dev
# kemudian buka http://localhost:3000
```

### Build produksi

```bash
npm run build
npm start
```

## 🧠 Cara Kerja AI

Aurora menggunakan generator deterministik berbasis hash yang mengkombinasikan pola strategi bisnis modern, insight kreatif, dan roadmap aksi. Pendekatan ini memastikan setiap prompt menghasilkan blueprint yang konsisten namun tetap bernuansa unik.

## 📁 Struktur Direktori

```
app/                # Halaman Next.js dan API routes
lib/generator.ts    # Mesin generatif Aurora
public/             # Aset statis
```

## 📝 Lisensi

Dirilis sebagai open source di bawah lisensi MIT.

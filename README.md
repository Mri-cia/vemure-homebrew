# Vemure Homebrew

Aplikasi web frontend berbasis [React 19](https://react.dev/) dan [Vite 8](https://vite.dev/) untuk menjelajahi dan mengelola katalog modul homebrew **GURPS** (*Generic Universal RolePlaying System*) yang mencakup **Skills**, **Traits**, dan **Equipment**.

---

## Tech Stack & Architecture

- **Framework**: [React 19](https://react.dev/) dengan [React Router DOM v7](https://reactrouter.com/)
- **Build Tool**: [Vite 8](https://vite.dev/) (ES Modules)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) dengan CSS custom properties (`src/index.css`) serta desain responsif untuk mobile dan desktop
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [oxlint](https://oxc.rs/) (`react` & `oxc` plugins)
- **4-Layer Frontend Architecture**:
  1. **Configuration Layer (`src/CONSTANT.js`)**: Registri konstanta URL dan path request aplikasi.
  2. **API Client Layer (`src/api/`)**: Modul fetch asynchronous (`skill.js`, `trait.js`), pemformatan payload, dan penanganan error (`ApiError`).
  3. **Custom Hook Layer (`src/hooks/`)**: Abstraksi state data, status `loading`, `error`, pembatalan request stale, dan fungsi mutasi (`useSkills`, `useTraits`).
  4. **Page & UI Component Layer (`src/pages/`, `src/components/`, `src/elements/`)**: Halaman fitur, validasi form sisi klien, modal tambah/edit, dialog konfirmasi hapus, dan elemen UI reusable.

---

## Project Structure

```text
vemure-homebrew/
├── lib/
│   └── states.js                # Konstanta status modal (Status.OPEN, Status.CLOSED)
├── public/                      # Aset statis publik
├── src/
│   ├── api/
│   │   ├── skill.js             # Fungsi request & payload formatter untuk Skills
│   │   └── trait.js             # Fungsi request & payload formatter untuk Traits
│   ├── components/
│   │   ├── modal.jsx            # Komponen modal overlay reusable
│   │   └── navbar.jsx           # Navigasi utama & bilah pencarian
│   ├── elements/
│   │   ├── cards.jsx            # Card ekspansi (Home) & CardRender (Skills/Traits)
│   │   ├── float-button.jsx     # Tombol aksi mengambang (+) untuk membuka form tambah
│   │   └── tabs.jsx             # FilterTabs untuk berpindah kategori/tipe
│   ├── hooks/
│   │   ├── useSkills.js         # Custom hook state & aksi CRUD Skills
│   │   └── useTraits.js         # Custom hook state, filter kategori & aksi CRUD Traits
│   ├── pages/
│   │   ├── home.jsx             # Halaman utama pemilihan modul GURPS
│   │   ├── skills.jsx           # Halaman daftar, form modal & manajemen Skills
│   │   ├── traits.jsx           # Halaman daftar, filter tab & manajemen Traits
│   │   └── equipment.jsx        # Halaman tabel katalog Equipment
│   ├── App.jsx                  # Definisi route aplikasi
│   ├── CONSTANT.js              # Konfigurasi konstanta endpoint
│   ├── index.css                # Variabel tema CSS & konfigurasi Tailwind v4
│   ├── layout.jsx               # Layout utama (Navbar + Outlet)
│   └── main.jsx                 # Entry point React DOM
├── index.html
├── package.json
└── vite.config.js
```

---

## Features & Pages

### 1. Home (`/`)
- Kartu navigasi interaktif yang dapat diperluas untuk menuju halaman **Equipment**, **Skills**, **Traits**, dan **Core**.
- Grid responsif (`1` kolom pada layar mobile, `2` kolom pada tablet, dan `4` kolom pada desktop).

### 2. Skills (`/skills`)
- **Catalog Grid**: Menampilkan kartu skill dengan nama, kombinasi `Attribute/Difficulty`, dan label `Spec. required` untuk skill yang membutuhkan spesialisasi.
- **Add & Edit Modal**: Form interaktif dengan validasi sisi klien:
  - `Name`: Wajib diisi, `2–60` karakter.
  - `Attribute`: Pilihan `ST`, `DX`, `IQ`, `HT`, `Per`, atau `Will`.
  - `Difficulty`: Pilihan `Easy`, `Average`, `Hard`, atau `Very Hard`.
  - `Notes`: Opsional, maksimal `200` karakter.
  - `Requires Specialization`: Checkbox boolean.
- **Delete Confirmation**: Dialog konfirmasi sebelum menghapus item beserta tampilan pesan error dan proteksi klik ganda (`Saving...` / `Deleting...`).

### 3. Traits (`/traits`)
- **Category Tabs**: Filter tab interaktif untuk kategori `Advantage`, `Disadvantage`, dan `Quirk`.
- **Add & Edit Modal**: Form tambah/edit yang otomatis mengikuti tab kategori aktif saat dibuka, dilengkapi validasi sisi klien:
  - `Name`: Wajib diisi, `2–80` karakter.
  - `Category`: Pilihan `Advantage`, `Disadvantage`, atau `Quirk`.
  - `Type`: Pilihan `Physical`, `Mental`, atau `Social`.
  - `Notes`: Opsional, maksimal `200` karakter.
- **Delete Confirmation**: Dialog konfirmasi penghapusan trait dengan penanganan state loading dan error.

### 4. Equipment (`/equipment`)
- Filter tab kategori (`Melee`, `Ranged`, `Ammunition`) dan tampilan tabel 8 kolom (`ID`, `Name`, `Damage`, `Parry`, `ST`, `Cost`, `Weight`, `TL`) dengan container scroll horizontal untuk layar mobile.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (disarankan v20 atau lebih baru)
- [npm](https://www.npmjs.com/)

### Installation

```bash
cd vemure-homebrew
npm install
```

### Running the Application

```bash
# Menjalankan development server dengan HMR (default: http://localhost:5173)
npm run dev

# Membuat production bundle ke folder dist/
npm run build

# Menjalankan preview hasil production build
npm run preview
```

---

## Linting & Quality Assurance

```bash
# Menjalankan pemeriksaan kode dengan oxlint
npm run lint
```

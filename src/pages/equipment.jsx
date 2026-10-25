import { useState } from "react";
import { Plus } from "lucide-react";
import FloatAddButton from "../elements/float-button";

const TABS = ["Melee", "Ranged", "Ammunition"];

const COLUMNS = ["ID", "Name", "Damage", "Parry", "ST", "Cost", "Weight", "TL"];
const GRID = "grid-cols-[1fr_2fr_2fr_2fr_1fr_1.5fr_2fr_0.5fr]";

export default function EquipmentPage() {
  const [tab, setTab] = useState("Melee");
  const [rows] = useState([]); // fill with your data

  return (
    <div className="relative min-h-[calc(100vh-83px)]">

      <div className="mx-30 my-2 flex border border-(--secondary-color)">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 h-8 font-bold text-sm cursor-pointer transition-colors ${
              tab === t
                ? "bg-(--secondary-accent) text-(--primary-color)"
                : "hover:bg-(--card-bg)"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table header */}
      <div
        className={`px-12 h-[38px] grid ${GRID} items-center
          border-t border-t-(--line) border-b border-b-(--primary-color) font-bold text-xl`}
      >
        {COLUMNS.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>

      {/* Table body */}
      {rows.map((row) => (
        <div
          key={row.id}
          className={`px-12 py-2 grid ${GRID} border-b border-(--border) hover:bg-(--card-bg)`}
        >
          <span>{row.id}</span>
          <span>{row.name}</span>
          <span>{row.damage}</span>
          <span>{row.parry}</span>
          <span>{row.st}</span>
          <span>{row.cost}</span>
          <span>{row.weight}</span>
          <span>{row.tl}</span>
        </div>
      ))}

      <FloatAddButton/>
    </div>
  );
}
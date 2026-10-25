import { useState } from "react";
import FloatAddButton from "../elements/float-button";
import FilterTabs from "../elements/tabs";

const TABS = ["Melee", "Ranged", "Ammunition"];
const COLUMNS = ["ID", "Name", "Damage", "Parry", "ST", "Cost", "Weight", "TL"];

const GRID = "grid-cols-[1fr_2fr_2fr_2fr_1fr_1.5fr_2fr_0.5fr]";

export default function EquipmentPage() {
  const [activeFilter, setActiveFilter] = useState("Melee");
  const [rows] = useState([]); 

  return (
    <div className="relative min-h-[calc(100vh-83px)]">
        <FilterTabs tabs={TABS} active={activeFilter} tabChange={setActiveFilter} />

      <div
        className={`px-12 h-[38px] grid ${GRID} items-center
          border-t border-t-(--line) border-b border-b-(--primary-color) font-bold text-xl`}
      >
        {COLUMNS.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>

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
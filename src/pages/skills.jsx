import FilterTabs from "../elements/tabs";
import { useState } from "react";
import FloatAddButton from "../elements/float-button";
import SkillsData from "../../data/gurps_skills.json"
import { CardRender } from "../elements/cards";

const TABS = ["Advantage", "Disadvantage", "Quirk"];

const TRAITS = {
  Advantage: [{ id: 1, name: "trait_name", cost: "cost", type: "type" }],
  Disadvantage: [],
  Quirk: [],
};

export default function SkillsPage() {
  const [tab, setTab] = useState("Advantage");
  const items = TRAITS[tab];

  return (
    <div className="relative min-h-[calc(100vh-83px)] py-5">
      <div className=" grid grid-cols-[repeat(auto-fill,210px)] gap-4 justify-center">
        {SkillsData.map((t, index) => (
          <CardRender key={index}>
            <p>
              {t.skill_name}
            </p>
            <p> ({t.attribute}/{t.difficulty})</p>
          </CardRender>
        ))}
      </div>
      
      
        <FloatAddButton/>
    </div>
  );
}

import FloatAddButton from "../elements/float-button";
import { CardRender } from "../elements/cards";
import { useSkills } from "../hooks/useSkills";

export default function SkillsPage() {
  const { skills: SkillsData, loading, error, reloadSkill } = useSkills();

  return (
    <div className="relative min-h-[calc(100vh-83px)] py-5">
      {loading && (
        <div className="text-center">
          <p>Loading traits...</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-red-500 text-center">{error}</p>
          <button
            className="bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={reloadTraits}
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && (
        <div className=" grid grid-cols-[repeat(auto-fill,210px)] gap-4 justify-center">
          {SkillsData.map((t, index) => (
            <CardRender key={index}>
              <p>{t.skill_name}</p>
              <p>
                {" "}
                ({t.attribute}/{t.difficulty})
              </p>
            </CardRender>
          ))}
        </div>
      )}

      <FloatAddButton />
    </div>
  );
}

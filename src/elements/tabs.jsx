export default function FilterTabs({tabs, active, tabChange}) {

  return (
    <div className="mx-30 my-2 flex border border-(--secondary-color)">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => tabChange(t)}
          className={`flex-1 h-8 font-bold text-sm cursor-pointer transition-colors ${
            active === t
              ? "bg-(--secondary-accent) text-(--primary-color)"
              : "hover:bg-(--card-bg)"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

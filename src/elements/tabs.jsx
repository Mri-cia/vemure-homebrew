export default function FilterTabs({tabs, active, tabChange}) {

  return (
    <div className="mx-4 sm:mx-12 md:mx-30 my-2 flex border border-(--secondary-color)">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => tabChange(t)}
          className={`flex-1 h-8 px-1 font-bold text-xs sm:text-sm truncate cursor-pointer transition-colors ${
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

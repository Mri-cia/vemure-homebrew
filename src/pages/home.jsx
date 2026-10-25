import Card from "../elements/cards";

export default function HomePage() {
  const itemList = [
    {
      nama: "Equipment",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
    { nama: "Skills",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
    { nama: "Traits",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
    { nama: "Core",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
  ];
  return (
    <div className="min-h-[calc(100vh-80px)] items-start grid grid-cols-4 gap-2 px-16 content-center">
      {itemList.map((i) => (
        <div className="h-120 flex justify-center items-center">
          <div className="relative w-[210px] h-full">
            <Card key={i.nama} title={i.nama} description={i.desc} />
          </div>
        </div>
      ))}
    </div>
  );
}

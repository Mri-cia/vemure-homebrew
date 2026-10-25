import Card from "../elements/cards";

export default function HomePage() {
  const itemList = [
    {
      nama: "Equipment",
      link: '/equipment',
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
    { nama: "Skills",
      link: '/equipment',
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
    { nama: "Traits",
      link: '/equipment',
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
    { nama: "Core",
      link: '/equipment',
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
  ];
  return (
    <div className="min-h-[calc(100vh-80px)] items-start grid grid-cols-4 gap-2 px-16 content-center">
      {itemList.map((i) => (
        <div className="h-120 flex justify-center items-center">
          <div className="relative w-[210px] h-full">
            <Card key={i.nama} title={i.nama} description={i.desc} link={i.link} />
          </div>
        </div>
      ))}
    </div>
  );
}

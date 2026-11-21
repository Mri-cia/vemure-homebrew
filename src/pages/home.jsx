import { Card } from "../elements/cards";

export default function HomePage() {
  const itemList = [
    {
      nama: "Equipment",
      link: '/equipment',
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
    { nama: "Skills",
      link: '/skills',
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
    { nama: "Traits",
      link: '/traits',
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
    { nama: "Core",
      link: '/equipment',
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus lacus. Curabitur at libero ut elit cursus cursus. Vestibulum mi lectus, pulvinar eget consectetur eget, tincidunt eu quam.",
    },
  ];
  return (
    <div className="min-h-[calc(100vh-80px)] items-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 px-4 sm:px-8 md:px-16 py-6 content-center">
      {itemList.map((i) => (
        <div key={i.nama} className="h-96 sm:h-120 flex justify-center items-center">
          <div className="relative w-full max-w-[260px] sm:w-[210px] h-full">
            <Card title={i.nama} description={i.desc} link={i.link} />
          </div>
        </div>
      ))}
    </div>
  );
}

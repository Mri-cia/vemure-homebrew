import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Card({ title, description, link}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`absolute left-0 top-1/2 -translate-y-1/2 w-full
        border-2 border-(--border) bg-(--bg)
        flex flex-col items-center cursor-pointer duration-300
        transition-[height]
        ${isOpen ? "z-10 h-full" : "z-0 h-[100px]"}
        `}
    >
      <div onClick={() => setIsOpen((prev) => !prev)} 
        className={`py-8 w-full text-center
            ${isOpen ? "opacity-50 bg-(--card-mask) hover:opacity-100 text-(--primary-color)" : ""}`}>
        <p className="font-bold text-xl">{title}</p>
      </div>

      <div
        className={` px-2 relative flex-1 grid w-full transition-[grid-template-rows] duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="py-2">{description}</p>
        </div>
        <Link to={link}
          className={`absolute bottom-0 w-full h-20 ${isOpen ? 'flex justify-center items-center' : 'hidden'}`}>
            <span>Detail</span>
            <ArrowRight/>
        </Link>
      </div>
    </div>
  );
}

export default Card;

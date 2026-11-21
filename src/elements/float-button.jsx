import { Plus } from "lucide-react"


export default function FloatAddButton({onClick}){
    return(
    <button
        onClick={onClick}
        aria-label="Add item"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-12 size-14 sm:size-[75px] rounded-full grid place-items-center
          bg-(--secondary-color) text-(--primary-color) cursor-pointer hover:brightness-110
          z-40"
      >
        <Plus size={40} strokeWidth={2} />
      </button>
    )
}
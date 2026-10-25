import { Plus } from "lucide-react"


export default function FloatAddButton(){
    return(
    <button
        aria-label="Add item"
        className="fixed bottom-6 right-12 size-[75px] rounded-full grid place-items-center
          bg-(--secondary-color) text-(--primary-color) cursor-pointer hover:brightness-110
          z-1000"
      >
        <Plus size={40} strokeWidth={2} />
      </button>
    )
}
import { Status } from "../../lib/states";

export default function Modal({ children, status, onClose }) {
  const isOpen = status === Status.OPEN;

  return (
    <div
      className={`fixed inset-0 z-50 items-center justify-center bg-black/40 ${
        isOpen ? "flex" : "hidden"
      }`}
      onClick={onClose}
    >
      {/* e.stopPropagation() is required here so clicking inside the modal doesn't trigger onClose */}
      <div
        className="relative min-w-100 h-120 border border-(--secondary-color) bg-(--primary-color)"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
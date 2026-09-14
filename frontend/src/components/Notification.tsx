interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const Notification = ({ message, type, onClose }: NotificationProps) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${bgColor} animate-fade-in`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="font-bold text-lg leading-none hover:opacity-80">
        &times;
      </button>
    </div>
  );
};

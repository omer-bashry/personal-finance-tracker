export default function IconCircle({ children, bgColor = "bg-green-100", textColor = "text-green-600" }) {
  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor} ${textColor}`}>
      {children}
    </div>
  );
}

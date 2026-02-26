export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

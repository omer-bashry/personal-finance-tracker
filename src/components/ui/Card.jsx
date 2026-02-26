export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
}

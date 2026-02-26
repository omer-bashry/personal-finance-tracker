export default function Badge({ text, type = "positive" }) {
  const color = type === "positive" ? "text-green-600" : "text-red-500";
  return <span className={`text-sm ${color}`}>{text}</span>;
}

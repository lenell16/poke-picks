import { cn } from "@/lib/utils";

export default function StatBar({
  stat,
  max = 200,
}: {
  stat: number;
  max?: number;
}) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={cn("bg-green-500 h-2.5 rounded-full", {
          "bg-yellow-500": stat < 60,
          "bg-red-500": stat < 25,
        })}
        style={{
          width: (stat / max) * 100 + "%",
        }}
      />
    </div>
  );
}

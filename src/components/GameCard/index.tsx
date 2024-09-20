import GameType from "@/util/types/Game";
import Link from "next/link";
import { BiRightArrowCircle } from "react-icons/bi";

interface GameCardProps {
  data: GameType;
}

export function GameCard({ data }: GameCardProps) {
  return (
    <Link href={`/game/${data.id}`}>
      <div className="w-full bg-slate-200 rounded-lg p-4 mb-5 hover:scale-105 transition-all duration-300">
        <div className="w-full h-full ">
          <img src={data.image_url} alt={data.title} className="w-full " />
          <div className="flex flex-row mt-4 items-center justify-between">
            <p className="text-sm font-bold text-black text-ellipsis truncate whitespace-nowrap overflow-hidden">
              {data.title}
            </p>
            <BiRightArrowCircle size={24} color="#000" className="ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

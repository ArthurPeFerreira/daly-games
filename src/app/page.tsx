import { BsArrowRightSquare } from "react-icons/bs";
import GameType from "@/util/types/Game";
import Link from "next/link";
import { Input } from "../components/Input";
import { GameCard } from "../components/GameCard";

async function getDalyGame() {
  try {
    const res = await fetch(
      "https://sujeitoprogramador.com/next-api/?api=game_day",
      { next: { revalidate: 320 } }
    );
    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

async function getGamesData() {
  try {
    const res = await fetch(
      "https://sujeitoprogramador.com/next-api/?api=games",
      { next: { revalidate: 320 } }
    );
    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const jogo_escolhido: GameType = await getDalyGame();
  const jogos: GameType[] = await getGamesData();

  return (
    <main className="w-full px-2 pt-2">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center">
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          Separamos um jogo exclusivo pra você
        </h1>
        <Link href={`/game/${jogo_escolhido.id}`}>
          <section className="w-full max-w-screen-lg bg-black rounded-lg">
            <div className="w-full max-w-screen-lg max-h-96 h-96 relative rounded-lg">
              <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2">
                <p className="font-bold text-xl text-white">
                  {jogo_escolhido.title}
                </p>
                <BsArrowRightSquare size={24} color="#FFF" />
              </div>
              <img
                src={jogo_escolhido.image_url}
                alt={jogo_escolhido.title}
                className="max-h-96 object-cover w-full rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
              />
            </div>
          </section>
        </Link>
        <Input />

        <div>
          <h2 className="text-lg font-bold mt-2 mb-5">Jogos para conhecer</h2>
          <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {jogos.map((jogo) => (
              <GameCard key={jogo.id} data={jogo} />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}

import { GameCard } from "@/components/GameCard";
import { Input } from "@/components/Input";
import GameType from "@/util/types/Game";

async function getDalyGame(title: string) {
  try {
    const res = await fetch(
      `https://sujeitoprogramador.com/next-api/?api=game&title=${decodeURI(
        title
      )}`
    );
    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Search({
  params: { title },
}: {
  params: { title: string };
}) {
  const Busca: GameType[] = await getDalyGame(title);

  return (
    <main className="w-full px-2 pt-2">
      <div className="max-w-screen-lg mx-auto flex flex-col ">
        <Input />
        <h2 className="font-bold text-xl mt-0 mb-5">
          Veja oque encontramos na nossa base:
        </h2>
        <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {!Busca ? (
            <p>Nenhum jogo encontrado...</p>
          ) : (
            Busca.map((jogo) => <GameCard key={jogo.id} data={jogo} />)
          )}
        </div>
      </div>
    </main>
  );
}

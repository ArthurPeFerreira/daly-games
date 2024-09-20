import GameIndividualType from "@/util/types/GameIndividual";
import { redirect } from "next/navigation";
import { Metadata } from "next";

interface PropsParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PropsParams): Promise<Metadata> {
  try {
    const response: GameIndividualType = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 60 } }
    )
      .then((res) => res.json())
      .catch(() => {
        return {
          title: "DalyGames - Descubra jogos incríveis para se divertir.",
        };
      });

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (err) {
    return {
      title: "DalyGames - Descubra jogos incríveis para se divertir.",
    };
  }
}

async function getGame(id: string) {
  try {
    const res = await fetch(
      `https://sujeitoprogramador.com/next-api/?api=game&id=${id}`,
      { cache: "no-store" }
    );

    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Game({
  params: { id },
}: {
  params: { id: string };
}) {
  const jogo: GameIndividualType = await getGame(id);

  if (!jogo) {
    redirect("/");
  }

  return (
    <main className="w-full px-2 pt-2">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center">
        <section className="w-full max-w-screen-lg bg-black rounded-lg">
          <div className="w-full max-w-screen-lg max-h-96 h-96 relative rounded-lg">
            <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2"></div>
            <img
              src={jogo.image_url}
              alt={jogo.title}
              className="max-h-96 object-cover w-full rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
            />
            <h1 className="font-bold text-2xl text-black my-3">{jogo.title}</h1>
            <p className="font-normal text-md text-black">{jogo.description}</p>
            <h2 className="font-bold text-xl text-black my-3">
              Plataformas Disponíveis:
            </h2>
            <div className="flex flex-row">
              {jogo.platforms.map((plataforma) => (
                <label
                  className="bg-slate-200 text-black p-1 mr-3 rounded"
                  key={plataforma}
                >
                  {plataforma}
                </label>
              ))}
            </div>
            <h2 className="font-bold text-xl text-black my-3">Categorias</h2>
            <div className="flex flex-row">
              {jogo.categories.map((categorias) => (
                <label
                  className="bg-slate-200 text-black p-1 mr-3 rounded"
                  key={categorias}
                >
                  {categorias}
                </label>
              ))}
            </div>
            <div className="flex flex-row my-3">
              <p className="font-bold text-black mr-1">Lançamento: </p>
              <p className="text-black">{jogo.release}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

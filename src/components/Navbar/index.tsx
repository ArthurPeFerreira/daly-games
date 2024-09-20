"use serverside";
import Logo from "@/../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { LiaGamepadSolid } from "react-icons/lia";

export function Navbar() {
  return (
    <header className="w-full h-28 bg-slate-100 text-black px-2">
      <div className="max-w-screen-lg mx-auto flex items-center h-28">
        <nav className="flex w-full justify-center items-center gap-4 sm:justify-between">
          <div className="flex flex-row gap-4">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo do Site DalyGames"
                quality={100}
                priority={true}
                className="w-full"
              />
            </Link>
            <div className="flex flex-row justify-center items-center gap-4">
              <Link href="/">
                <p>Jogos</p>
              </Link>
              <Link href="/profile">
                <p>Perfil</p>
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex justify-center items-center mr-2">
            <Link href="/profile">
              <LiaGamepadSolid size={34} color="#475569" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

export function Input() {
  const [input, setInput] = useState("");
  const router = useRouter();

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (input) {
      router.push(`/game/search/${input}`);
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-slate-200 flex flex-row my-5 gap-2 justify-between items-center rounded-xl p-2"
    >
      <input
        type="text"
        placeholder="Está procurando algum jogo?"
        value={input}
        onChange={(value) => setInput(value.target.value)}
        className="bg-transparent w-11/12 outline-none"
      />
      <button type="submit">
        <FiSearch size={24} color="#ea580c" className="" />
      </button>
    </form>
  );
}

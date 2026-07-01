import React, { useState, useEffect } from 'react';

const QUOTES = [
  {
    quote: "If you don't take risks, you can't create a future.",
    character: "Monkey D. Luffy",
    anime: "One Piece"
  },
  {
    quote: "A lesson without pain is meaningless. That's because no one can gain without sacrificing something. But by enduring that pain and overcoming it, he shall obtain a powerful, unmatched heart.",
    character: "Edward Elric",
    anime: "Fullmetal Alchemist: Brotherhood"
  },
  {
    quote: "You need to accept the fact that you're not the best and have all the will to strive to be better than anyone else.",
    character: "Roronoa Zoro",
    anime: "One Piece"
  },
  {
    quote: "Believe in yourself. Not in the you who believes in me. Not the me who believes in you. Believe in the you who believes in yourself!",
    character: "Kamina",
    anime: "Tengen Toppa Gurren Lagann"
  },
  {
    quote: "People, who can’t throw something important away, can never hope to change anything.",
    character: "Armin Arlert",
    anime: "Attack on Titan"
  },
  {
    quote: "There is no such thing as a painless lesson. They just don't exist. Sacrifices are necessary.",
    character: "Itachi Uchiha",
    anime: "Naruto"
  },
  {
    quote: "Whatever you lose, you'll find it again. But what you throw away you'll never get back.",
    character: "Kenshin Himura",
    anime: "Rurouni Kenshin"
  },
  {
    quote: "I want to see what happens if I don't give up.",
    character: "Saitama",
    anime: "One Punch Man"
  },
  {
    quote: "Precious things exist simply because they are precious.",
    character: "Gojo Satoru",
    anime: "Jujutsu Kaisen"
  },
  {
    quote: "Work hard until your idols become your rivals.",
    character: "Gon Freecss",
    anime: "Hunter x Hunter"
  },
  {
    quote: "A dropout will beat a genius through hard work.",
    character: "Rock Lee",
    anime: "Naruto"
  },
  {
    quote: "Stand up and walk. Keep moving forward. You've got two good legs. So get up and use them. You're strong enough to make your own path.",
    character: "Edward Elric",
    anime: "Fullmetal Alchemist: Brotherhood"
  }
];

export default function AnimeQuote({ isDark }: { isDark: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const days = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    setIndex(days % QUOTES.length);
  }, []);

  const current = QUOTES[index];

  return (
    <div className="max-w-2xl mx-auto px-6 mb-0 text-center">
      <p className={`text-lg md:text-xl font-medium leading-relaxed italic mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        "{current.quote}"
      </p>
      <div className={`text-sm font-semibold tracking-wide ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        — {current.character}, <span className="italic">{current.anime}</span>
      </div>
    </div>
  );
}

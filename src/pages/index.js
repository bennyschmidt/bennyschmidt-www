import { useState, useEffect } from 'react';

import {
  Great_Vibes as GreatVibes,
  Inter
} from 'next/font/google';

const PORTFOLIO = [
  {
    id: "portfolio-item-0",
    alt: "Game browser",
    src: "/img/portfolio/item-0.png",
    href: "https://dribbble.com/shots/22531499-Game-browser",
    year: 2023
  },
  {
    id: "portfolio-item-1",
    alt: "New message",
    src: "/img/portfolio/item-1.png",
    href: "https://dribbble.com/shots/3039672-New-message",
    year: 2016
  },
  {
    id: "portfolio-item-2",
    alt: "Peach Player",
    src: "/img/portfolio/item-2.png",
    href: "https://dribbble.com/shots/3688183-Peach-Player",
    year: 2017
  },
  {
    id: "portfolio-item-3",
    alt: "Capitol.pn (The Hunger Games)",
    src: "/img/portfolio/item-3.png",
    href: "https://www.behance.net/bennyschmidt",
    year: 2011
  },
  {
    id: "portfolio-item-4",
    alt: "Peach Player (iOS)",
    src: "/img/portfolio/item-4.png",
    href: "https://dribbble.com/shots/3688183-Peach-Player",
    year: 2017
  },
  {
    id: "portfolio-item-5",
    alt: "Get a ride",
    src: "/img/portfolio/item-5.png",
    href: "https://dribbble.com/shots/3019741-Get-a-ride",
    year: 2016
  },
  {
    id: "portfolio-item-6",
    alt: "Dusk browser",
    src: "/img/portfolio/item-6.png",
    href: "https://github.com/bennyschmidt/medici",
    year: 2023
  },
  {
    id: "portfolio-item-7",
    alt: "Wave",
    src: "/img/portfolio/item-7.png",
    href: "https://www.behance.net/gallery/180474337/Social-media-app",
    year: 2023
  },
  {
    id: "portfolio-item-8",
    alt: "Wyre",
    src: "/img/portfolio/item-8.png",
    href: "https://dribbble.com/shots/2991649-Send-money",
    year: 2016
  },
  {
    id: "portfolio-item-9",
    alt: "Playlist",
    src: "/img/portfolio/item-9.png",
    href: "https://dribbble.com/shots/3688183-Peach-Player",
    year: 2017
  },
  {
    id: "portfolio-item-10",
    alt: "City line icons",
    src: "/img/portfolio/item-10.png",
    href: "https://www.behance.net/gallery/54747979/World-Cities-Line-Icons",
    year: 2014
  },
  {
    id: "portfolio-item-11",
    alt: "Early light/skeuomorphic",
    src: "/img/portfolio/item-11.png",
    href: "https://dribbble.com/shots/1649274-New-Message-flow",
    year: 2014
  },
  {
    id: "portfolio-item-12",
    alt: "Web design",
    src: "/img/portfolio/item-12.png",
    href: "https://dribbble.com/shots/4370618-Landing-page",
    year: 2018
  }
];

const inter = Inter({
  subsets: ['latin']
});

const greatVibes = GreatVibes({
  subsets: ['latin'],
  weight: '400'
});

const SocialMedia = () => (
  <h3 className="flex gap-1 items-center justify-center mb-4">
    <a href="https://www.dribbble.com/bennyschmidt" target="_blank">
      <img alt="Benny Schmidt on Dribbble" src="/img/dribbble.svg" className="rounded" width="24px" height="24px" />
    </a>
    <a href="https://www.github.com/bennyschmidt" target="_blank">
      <img alt="Benny Schmidt on GitHub" src="/img/github.svg" className="rounded" width="24px" height="24px" />
    </a>
  </h3>
);

export default function Home() {
  const [portfolio, setPortfolio] = useState();
  const [colCount, setColCount] = useState();

  useEffect(() => {

    /**
     * The responsive override is necessary to
     * for a simpler stacking grid effect (like Pinterest).
     */

    setColCount(
      window.innerWidth < 900 ? 1 : 3
    );

    if (PORTFOLIO?.length) {

      /**
       * Chunk the portfolio response into subarrays
       * of equal length, except the final array which
       * may include an extra item.
       */

      setPortfolio(
        new Array(colCount)
        .fill()
        .map((_, index) => {
          const chunkSize = (PORTFOLIO.length / colCount) << 0;
          const chunkStart = chunkSize * index;

          const chunkEnd = index < (colCount - 1)
            ? chunkStart + chunkSize
            : Infinity;

          return PORTFOLIO.slice(chunkStart, chunkEnd);
        })
      );
    }

    const onResize = () => (
      setColCount(window.innerWidth < 900 ? 1 : 3)
    );

    /**
     * Handle window resize
     */

    addEventListener('resize', onResize);

    return () => removeEventListener('resize', onResize);
  }, [colCount]);

  return !portfolio ? <div /> : (
    <div className="min-h-screen">
      <header>
        <h1 className={`text-center text-5xl text-slate-600 mt-3 lowercase ${greatVibes.className}`}>
          Benny
        </h1>
      </header>
      <main className={`flex flex-col items-center ${inter.className}`}>
        <h2 className="text-center text-sm text-slate-400 mt-4 mb-2">
          Designer + Developer
        </h2>
        <SocialMedia />
        <section className="flex gap-5 items-start justify-center w-5/6">
          {portfolio.map((list, index) => (
            <ul key={index} className="flex flex-col justify-start gap-5 list-none w-full">
              {list.map(({ id, alt, src, href, year }) => (
                <li key={id} className="rounded-lg w-full bg-slate-100 p-2 item">
                  <a href={href} target="_blank">
                    <img id={id} alt={alt} src={src} className="bg-slate-800 rounded-lg" width="100%" height="100%" />
                    <h3 className="text-sm text-slate-800 font-semibold flex flex-column items-center mt-2">
                      {alt}
                    </h3>
                    <p className="text-sm text-slate-500 flex flex-column items-center">
                      {year}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </section>
        <footer className="py-4">
          <SocialMedia />
          <p className="text-sm text-slate-600">
            <a href="mailto:hello@bennyschmidt.com" target="_blank">
              hello@bennyschmidt.com
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

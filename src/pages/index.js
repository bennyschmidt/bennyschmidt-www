import { useState, useEffect } from 'react';

import {
  Great_Vibes as GreatVibes,
  Inter
} from 'next/font/google';

import Image from 'next/image';
import Link from 'next/link';

import { slate } from 'tailwindcss/colors';

const BREAKPOINT = 1000;

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
    alt: "Get a ride",
    src: "/img/portfolio/item-5.png",
    href: "https://dribbble.com/shots/3019741-Get-a-ride",
    year: 2016
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
    alt: "Capitol.pn (The Hunger Games)",
    src: "/img/portfolio/item-3.png",
    href: "https://www.behance.net/bennyschmidt",
    year: 2011
  },
  {
    id: "portfolio-item-6",
    alt: "Wyre",
    src: "/img/portfolio/item-8.png",
    href: "https://dribbble.com/shots/2991649-Send-money",
    year: 2016
  },
  {
    id: "portfolio-item-7",
    alt: "Playlist",
    src: "/img/portfolio/item-9.png",
    href: "https://dribbble.com/shots/3688183-Peach-Player",
    year: 2017
  },
  {
    id: "portfolio-item-8",
    alt: "City line icons",
    src: "/img/portfolio/item-10.png",
    href: "https://www.behance.net/gallery/54747979/World-Cities-Line-Icons",
    year: 2014
  },
  {
    id: "portfolio-item-9",
    alt: "Early light/skeuomorphic",
    src: "/img/portfolio/item-11.png",
    href: "https://dribbble.com/shots/1649274-New-Message-flow",
    year: 2014
  }
];

const inter = Inter({
  subsets: ['latin']
});

const greatVibes = GreatVibes({
  subsets: ['latin'],
  weight: '400'
});

export default function Home() {
  const [portfolio, setPortfolio] = useState();
  const [colCount, setColCount] = useState();

  useEffect(() => {

    /**
     * The responsive override is necessary for
     * a simpler stacking grid effect (like Pinterest).
     */

    setColCount(
      window.innerWidth < BREAKPOINT ? 1 : 3
    );

    if (PORTFOLIO?.length) {

      /**
       * Chunk the portfolio response into subarrays
       * of equal length, except the final array which
       * may include an extra item.
       */

      const { length } = PORTFOLIO;

      setPortfolio(
        new Array(colCount)
        .fill()
        .map((_, index) => {
          const chunkSize = (length / colCount) << 0;
          const chunkStart = chunkSize * index;

          const chunkEnd = index < (colCount - 1)
            ? chunkStart + chunkSize
            : length;

          return PORTFOLIO.slice(chunkStart, chunkEnd);
        })
      );
    }

    const onResize = () => (
      setColCount(window.innerWidth < BREAKPOINT ? 1 : 3)
    );

    /**
     * Handle window resize
     */

    addEventListener('resize', onResize);

    return () => removeEventListener('resize', onResize);
  }, [colCount]);

  const full = colCount < 2;

  return !portfolio ? <div /> : (
    <div className="min-h-screen max-w-[1600px] mx-auto">
      <header>
        <h1 className={`text-center text-[2.4em] text-slate-400 my-10 lowercase ${greatVibes.className}`}>
          Benny
        </h1>
      </header>
      <main className={`flex flex-col items-center ${inter.className} pb-7`}>
        <section className="flex gap-5 pb-8 items-start justify-center w-5/6">
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
        <div className="flex justify-between w-4/5 my-16 brands opacity-30">
          <Image alt="DocuSign" src="/img/brands/docusign.png" width={118} height={27} className="object-contain" />
          <Image alt="Brave" src="/img/brands/brave.png" width={100} height={30.7} className="object-contain" />
          <Image alt="Nike" src="/img/brands/nike.png" width={100} height={39.5} className="object-contain" />
          <Image alt="Francis Ford Coppola Presents" src="/img/brands/francis-ford-coppola.png" width={112} height={52} className="object-contain" />
          <Image alt="Lionsgate" src="/img/brands/lionsgate.png" width={150} height={20} className="object-contain" />
          <Image alt="Red Bull" src="/img/brands/redbull.png" width={100} height={61} className="object-contain" />
        </div>
        <div className={`flex ${full ? 'flex-col' : ''} items-start justify-around gap-20 w-4/5 my-16`}>
          <figure>
            <Image
              alt="Figma"
              src="/img/figma.png"
              width={80}
              height={80}
              className="figma-icon"
            />
            <Image
              alt="Product designer"
              src="/img/design.png"
              width={400}
              height={300}
              style={{
                objectFit: 'cover',
                borderRadius: '2rem'
              }}
            />
          </figure>
          <div className={`flex flex-col justify-start max-w-[${full ? '100%' : '600px'}]`}>
            <h2 className="text-slate-800 font-semibold mb-4">Pixel Perfect Product Designer</h2>
            <p className="text-slate-800">Benny has held professional positions at top companies as both a Product Designer and as a Software Engineer. With a background in design and passion for UI & front-end, Benny enjoys delighting users with fun experiences and intuitive interfaces.</p>
          </div>
        </div>
        <div className={`flex ${full ? 'flex-col-reverse' : ''} items-start justify-around gap-20 w-4/5 my-16`}>
          <div className="flex flex-col justify-start max-w-[600px]">
            <h2 className="text-slate-800 font-semibold mb-4">Full Stack React Developer</h2>
            <p className="text-slate-800">Benny has been coding for about 25 years. In recent years, his focus is almost exclusively on dynamic languages like Node, Ruby, and Python, and front-end frameworks like React.</p>
            <div className="text-sm text-slate-500 mt-4">
              <h6>Current favorites:</h6>
              <ul className="list-none px-2">
                <li className="my-2">Next.js on Vercel</li>
                <li className="my-2">React Three Fiber (Three.js)</li>
                <li className="my-2">React Native (iOS/Android)</li>
              </ul>
            </div>
          </div>
          <figure>
            <Image
              alt="VS Code"
              src="/img/vscode.png"
              width={80}
              height={80}
              className="vscode-icon"
            />
            <Image
              alt="React developer"
              src="/img/react.png"
              width={400}
              height={300}
              style={{
                objectFit: 'cover',
                borderRadius: '2rem'
              }}
            />
          </figure>
        </div>
        <aside className={`flex items-center justify-center gap-4 mt-10 mb-20${colCount < 3 ? ' flex-col' : ''}`}>
          <Link href="https://www.figma.com/file/di7L8balWujJqWyfQYbGbh/Resume?type=design&node-id=10%3A32" target="_blank" className="flex items-center justify-center text-slate-600 border-solid border-2 border-slate-200 rounded-full px-8 py-2 hover:bg-slate-600 hover:text-white hover:border-transparent">
            <Image src="/img/figma.svg" alt="Open resume in Figma" width={14} height={14} />&nbsp;
            View resume
          </Link>
          <Link href="mailto:hello@bennyschmidt.com" target="_blank" className="text-slate-600 border-solid border-2 border-slate-200 rounded-full px-8 py-2 hover:bg-slate-600 hover:text-white hover:border-transparent">
            Get in touch
          </Link>
        </aside>
        <footer className="fixed bottom-0 left-0 right-0 z-10" style={{ boxShadow: `0 0 5rem ${slate[500]}50` }}>
          <div className={`relative w-full h-full flex items-center justify-${full ? 'start' : 'center'}`}>
            <h3 className="flex gap-2 mx-2 items-center justify-center z-20">
              <Link href="https://www.dribbble.com/bennyschmidt" target="_blank">
                <Image alt="Benny Schmidt on Dribbble" src="/img/dribbble.svg" className="rounded" width={24} height={24} />
              </Link>
              <Link href="https://www.github.com/bennyschmidt" target="_blank">
                <Image alt="Benny Schmidt on GitHub" src="/img/github.svg" className="rounded" width={24} height={24} />
              </Link>
            </h3>
            <aside className="absolute flex items-center justify-end top-0 right-0 w-[50%] m-3 rounded-[1rem] text-slate-500 text-sm">
              <em>Need a logo?</em>&nbsp;
              <Link
                style={{ border: '2px solid #00b300' }}
                className="rounded-[.5rem] py-[.1rem] px-[.5rem] font-bold mx-[.25rem] text-[#00b300] text-xs"
                href="/logos"
              >
                From $395
              </Link>
            </aside>
          </div>
        </footer>
      </main>
    </div>
  );
}

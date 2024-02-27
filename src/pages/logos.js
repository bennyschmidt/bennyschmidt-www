import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import {
  Great_Vibes as GreatVibes,
  Outfit
} from 'next/font/google';

const ORDER_URL = 'https://www.exactchange.network/benny/order';
const BREAKPOINT = 800;

const outfit = Outfit({
  subsets: ['latin']
});

const greatVibes = GreatVibes({
  subsets: ['latin'],
  weight: '400'
});

const Logos = () => {
  const [colCount, setColCount] = useState();
  const [disabled, setDisabled] = useState(false);
  const [brief, setBrief] = useState();
  const [name, setName] = useState();
  const [brandName, setBrandName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {

    /**
     * The responsive override is necessary for
     * a simpler stacking grid effect (like Pinterest).
     */

    setColCount(
      window.innerWidth < BREAKPOINT ? 1 : 2
    );

    const onResize = () => (
      setColCount(window.innerWidth < BREAKPOINT ? 1 : 2)
    );

    /**
     * Handle window resize
     */

    addEventListener('resize', onResize);

    return () => removeEventListener('resize', onResize);
  }, [colCount]);

  const onClickOrder = async () => {
    if (!disabled) {
      setDisabled(true);

      const isNameValid = document.querySelector('#name:valid');
      const isEmailValid = document.querySelector('#email:valid');

      const invalids = [];

      let isValid = true;

      if (!isNameValid) {
        invalids.push('name');
        isValid = false;
      }

      if (!isEmailValid) {
        invalids.push('email address');
        isValid = false;
      }

      if (!isValid) {
        alert(`Invalid ${invalids.join(', ')}.`);
        setDisabled(false);

        return;
      }

      const payload = {
        brief,
        name,
        brandName,
        email
      };

      const response = await fetch(ORDER_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response?.ok) {
        const result = await response.json();

        let responseText = 'There was a problem with the request.';

        if (result?.success) {
          responseText = 'Thank you, your request was received. Please check your email for further communications.';

          setDisabled(true);
        }

        alert(responseText);
      }
    }
  };

  return (
    <div className="min-h-screen max-w-[800px] mx-auto">
      <header>
        <h1 className={`text-center text-[2em] text-slate-400 mt-5 mb-0 lowercase ${greatVibes.className}`}>
          <Link href="/">Benny</Link>
        </h1>
        <h2 className={`text-center font-bold text-[4em] text-black mt-5 mb-10 leading-[1.1em] ${outfit.className}`}>
          Need a logo?
        </h2>
      </header>
      <main className={`flex flex-col items-center ${outfit.className}`}>
        <section className="flex gap-5 pb-8 items-start justify-center w-5/6">
          <div className={`flex-1 flex gap-5 flex-between ${colCount === 1 ? 'flex-col' : ''}`}>
            <div className="flex-1 flex flex-col justify-start items-center w-[100%] rounded-[1rem] p-[6%]" style={{
              boxShadow: '0 0 5rem rgba(0, 0, 0, .2)',
              borderBottom: '3px solid black'
            }}>
              <h2><strong className="text-[#00b300] text-[2em]">$395</strong></h2>
              <h3>Per concept</h3>
              <h4 className="text-slate-500">(3 variations)</h4>
              <div className="flex gap-2 items-center justify-around mt-4 w-[14rem]">
                <Image alt="diamond concept 1" src="/img/icons/diamond-1.svg" width={48} height={48} className="object-contain mt-[2rem] mr-[.75rem]" />
                <Image alt="diamond concept 2" src="/img/icons/diamond-2.svg" width={64} height={64} className="object-contain" />
                <Image alt="diamond concept 3" src="/img/icons/diamond-3.svg" width={64} height={64} className="object-contain" />
              </div>
              <p className="w-5/6 text-center my-6">I will create a unique brand logo and provide 3 variations of it.</p>
            </div>
            <div className="flex-1 flex flex-col justify-start items-center w-[100%] rounded-[1rem] p-[6%]" style={{
              boxShadow: '0 0 5rem rgba(0, 0, 0, .2)',
              borderBottom: '3px solid black'
            }}>
              <h2><strong className="text-[#00b300] text-[2em]">$95</strong></h2>
              <h3>Per revision</h3>
              <h4 className="text-slate-500">(3 iterations)</h4>
              <div className="flex items-center justify-around mt-4 w-[14rem]">
                <Image alt="diamond concept 4" src="/img/icons/diamond-6.svg" width={48} height={48} className="object-contain mr-[.5rem]" />
                <Image alt="diamond concept 5" src="/img/icons/diamond-5.svg" width={84} height={84} className="object-contain" />
                <Image alt="diamond concept 6" src="/img/icons/diamond-4.svg" width={52} height={52} className="object-contain" />
              </div>
              <p className="w-[75%] text-center my-6">Based on your feedback, I will iterate on the concept 3 times.</p>
            </div>
          </div>
        </section>
        <section className="flex gap-5 pb-8 items-start justify-center w-5/6">
          <div className="flex-1 flex flex-col justify-start items-center w-[100%] rounded-[1rem] p-[6%]" style={{
            boxShadow: '0 0 5rem rgba(0, 0, 0, .2)',
            borderBottom: '3px solid black'
          }}>
            <h2 style={{ fontSize: '2em' }}><strong className="text-black leading-[1.1em]">How it works</strong></h2>
            <h3>Delivery time: 5-7 days</h3>
            <h4 className="text-slate-500">(3 steps)</h4>
            <ol className="w-[75%] my-6 list-decimal">
              <li className="my-10">
                <h3><strong>Prompt</strong></h3>
                <p>Provide a brief explanation of what you need using the form below. You can optionally send additional information over email, or on a video call and I can take notes (free of charge). </p>
              </li>
              <li className="my-10">
                <h3><strong>Work</strong></h3>
                <p>I complete the work over the next <strong>5-7 days</strong>, doing the necessary research and production work to deliver a unique brand logo with <strong>3 variations</strong> in vector format, along with supporting materials to depict your brand in hypothetical scenarios.</p>
                <div className="bg-slate-200 my-3 p-5 rounded-[1rem]">
                  <em className="text-slate-500">For first-time customers, I require a <strong>$100 down payment</strong> toward the invoice to get started. I accept Venmo.</em>
                </div>
              </li>
              <li className="my-10">
                <h3><strong>Delivery</strong></h3>
                <p>I deliver a pitch deck in PDF format including the concepts, along with links to Figma where we can track feedback and iterations &mdash; when there are none, I send an invoice and transfer ownership to you.</p>
              </li>
            </ol>
          </div>
        </section>
        <section className="flex gap-5 pb-8 items-start justify-center w-5/6">
          <div className="flex-1 flex flex-col justify-start items-center w-[100%] rounded-[1rem] p-[6%]" style={{
            boxShadow: '0 0 5rem rgba(0, 0, 0, .2)',
            borderBottom: '3px solid black'
          }}>
            <h2 style={{ fontSize: '2em' }}><strong className="text-black">Step 1 &mdash; Prompt</strong></h2>
            <h3>Provide me with a design brief</h3>
            <h4 className="text-slate-500">(A sentence or paragraph)</h4>
            <textarea className="w-[100%] h-[15rem] bg-slate-100 outline-none my-3 p-5 rounded-[1rem]" placeholder="Describe what the logo is for and who the audience is. Feel free to include links to your website and current brand exposure, and to other brands that you admire." value={brief} onChange={({ target: { value }}) => setBrief(value)}></textarea>
            <input required id="name" className="w-[100%] bg-slate-100 outline-none my-3 p-5 rounded-[1rem]" placeholder="Your name" value={name} onChange={({ target: { value }}) => setName(value)} />
            <input className="w-[100%] bg-slate-100 outline-none my-3 p-5 rounded-[1rem]" placeholder="Your brand name" value={brandName} onChange={({ target: { value }}) => setBrandName(value)} />
            <input required id="email" type="email" value={email} onChange={({ target: { value }}) => setEmail(value)} className="w-[100%] bg-slate-100 outline-none my-3 p-5 rounded-[1rem]" placeholder="Your email address" />
            <button disabled={disabled} className="bg-black w-[100%] mt-5 p-5 rounded-[1rem] text-white" onClick={onClickOrder}>Let's go! 🎉</button>
          </div>
        </section>
        <section className="flex gap-5 pb-8 items-start justify-center w-5/6">
          <div className="flex-1 flex flex-col justify-start items-center w-[100%] rounded-[1rem] p-[6%]" style={{
            boxShadow: '0 0 5rem rgba(0, 0, 0, .2)',
            borderBottom: '3px solid black'
          }}>
            <h2 style={{ fontSize: '2em' }}><strong className="text-black">FAQ</strong></h2>
            <h3>Some quick info</h3>
            <div className="w-[100%] p-5">
              <p><strong>Are you local?</strong></p>
              <p>Yes, I live in Upper Haight.</p>
            </div>
            <div className="w-[100%] p-5">
              <p><strong>Are you available to meet?</strong></p>
              <p>Yes, I can meet you in person (within SF) or on a video call to discuss the project, free of charge. Send me an email at <Link href="mailto:hello@bennyschmidt.com" target="_blank" className="underline">hello@bennyschmidt.com</Link> to set up a time.</p>
            </div>
            <div className="w-[100%] p-5">
              <p><strong>What's the turnaround time?</strong></p>
              <p>Usually within 5-7 days.</p>
            </div>
            <div className="w-[100%] p-5">
              <p><strong>When should I pay for services?</strong></p>
              <p>I will send an invoice along with final media when there is no further feedback, or on the last day of work.</p>
            </div>
            <div className="w-[100%] p-5">
              <p><strong>Do you require a deposit?</strong></p>
              <p>For first-time customers, I require a $100 down payment that applies to the total.</p>
            </div>
            <div className="w-[100%] p-5">
              <p><strong>What forms of payment do you accept?</strong></p>
              <p>I accept most forms of payment, including <Link href="https://venmo.com/u/Benny-Schmidt-1" target="_blank" className="underline">Venmo</Link>.</p>
            </div>
            <div className="w-[100%] p-5">
              <p>Have any other questions? Email me at <Link href="mailto:hello@bennyschmidt.com" target="_blank" className="underline">hello@bennyschmidt.com</Link>.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Logos;

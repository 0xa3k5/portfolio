import Head from 'next/head';
import Image from 'next/image';
import JobHighlight from './components/JobHighlight';
import Seperator from './components/Seperator';
import TakeawayCard from './components/TakeawayCard';
import PortfolioCard from './components/PortfolioCard';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <section className='flex flex-col items-center h-screen justify-between border-b border-polar border-opacity-5 container'>
        <Header />
        <div className='h-full w-full pb-24 justify-center items-center flex'>
          <div className='flex flex-col items-center space-y-8'>
            <h1 className='font-playfair text-6xl'>
              I design digital products
            </h1>
            <p className='text-xl max-w-2xl text-center'>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country
            </p>
          </div>
        </div>
      </section>
      <section className='border-b border-polar border-opacity-5 container h-full flex flex-col space-y-24 items-center justify-center p-24 font-inter'>
        <h2 className='font-playfair text-5xl'>Work Experience</h2>
        <div className='flex flex-col space-y-12'>
          <JobHighlight
            imgSrc='/logos/elrond.svg'
            classname='max-w-xl'
            title='Elrond (Utrust) – Product Designer'
            period='Jan 2022 – Present'
            description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
          />
          <Seperator />
          <JobHighlight
            imgSrc='/logos/utrust.svg'
            classname='max-w-xl'
            title='Utrust – Product Designer'
            period='Nov 2021 – Jan 2022'
            description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
          />
          <Seperator />
          <JobHighlight
            imgSrc='/logos/catch.svg'
            classname='max-w-xl'
            title='Catch Social – Product Designer'
            period='May 2020 – Nov 2021'
            description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
          />
          <Seperator />
          <JobHighlight
            imgSrc='/logos/atolye15.svg'
            classname='max-w-xl'
            title='Atolye15 – UX/UI Designer'
            period='May 2019 – May 2020'
            description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
          />
        </div>
      </section>
      <section className='border-b border-polar border-opacity-5 container h-full flex flex-col space-y-24 items-center justify-center p-24 font-inter'>
        <h2 className='font-playfair text-5xl'>Career Highlights</h2>
        <div className='max-w-2xl flex flex-col space-y-16'>
          <PortfolioCard
            imgSrc='placeholder.png'
            title='Utrust'
            description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
            period='2022'
          />
          <PortfolioCard
            imgSrc='placeholder.png'
            title='Catch Social'
            description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
            period='2022'
          />
          <PortfolioCard
            imgSrc='placeholder.png'
            title='Atolye15'
            description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
            period='2022'
          />
        </div>
      </section>
      <section className='border-b border-polar border-opacity-5 container h-full flex flex-col space-y-24 items-center justify-center p-24 font-inter'>
        <h2 className='font-playfair text-5xl'>Side Projects</h2>
        <div className='container flex space-x-16'>
          <PortfolioCard
            imgSrc='placeholder.png'
            title='Utrust'
            description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
            period='2022'
          />
          <PortfolioCard
            imgSrc='placeholder.png'
            title='Catch Social'
            description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
            period='2022'
          />
          <PortfolioCard
            imgSrc='placeholder.png'
            title='Atolye15'
            description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
            period='2022'
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

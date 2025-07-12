import React from 'react';
import background from "@/shared/assets/backgrounds/grid.jpg";
import Header from './header';
import Home from './home';
import About from './about';
import Features from './features';
import Footer from './footer';

const Welocome: React.FC = () => {
    return (
        <>
            <Header />
            <div className="absolute opacity-5 h-screen flex background">
                <img src={background} className='h-screen w-screen' alt="" />
                <img src={background} className='h-screen w-screen' alt="" />
                <img src={background} className='h-screen w-screen' alt="" />
            </div>
            <main>
                <Home />
                <About />
                <Features />
            </main>
            <Footer />
        </>
    );
}

export default Welocome;
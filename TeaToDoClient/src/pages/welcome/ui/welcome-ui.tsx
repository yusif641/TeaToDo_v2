import React from 'react';
import Header from './header';
import Home from './home';
import About from './about';
import Features from './features';
import Footer from './footer';

const Welocome: React.FC = () => {
    return (
        <div className='overflow-hidden!'>
            <Header />
            <main>
                <Home />
                <About />
                <Features />
            </main>
            <Footer />
        </div>
    );
}

export default Welocome;
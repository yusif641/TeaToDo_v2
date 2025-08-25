import { useGSAP } from '@gsap/react';
import React from 'react'
import shine from "@/shared/assets/gifs/shine.gif";
import lines from "@/shared/assets/gifs/lines.gif";
import gsap from "gsap";
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import background from "@/shared/assets/backgrounds/grid.jpg";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText, ScrollTrigger);

const Home: React.FC = () => {
    useGSAP(() => {
        SplitText.create("h1", {
            type: "words",
            wordsClass: "word++",
            ignore: "sup",
            onSplit(self) {
                return gsap.from(self.words, {
                    y: -100,
                    opacity: 0,
                    rotation: "random(-80, 80)",
                    stagger: 0.1,
                    duration: 1,
                    ease: "back"
                });
            }
        });

        SplitText.create(".text", {
            type: "lines",
            mask: "lines",
            onSplit(self) {
                return gsap.from(self.lines, {
                    rotationX: -100,
                    transformOrigin: "50% 50% -160px",
                    opacity: 0,
                    duration: 1.3,
                    ease: "power3",
                    stagger: 0.25
                });
            }
        });

        const tl = gsap.timeline({ repeat: -1 });

        tl
            .to(".background", { x: -300, duration: 10, ease: "none" })
            .to(".background", { x: 0, duration: 10, ease: "none" });
    });

    return (
        <section className='pb-60 pt-100 relative h-[100vh] max-md:pt-70 max-sm:pt-50' id='home'>
            <div className="absolute opacity-5 h-screen w-screen top-0 left-0 flex background">
                <img src={background} className='w-full object-cover' alt="" />
                <img src={background} className='w-full object-cover' alt="" />
                <img src={background} className='w-full object-cover' alt="" />
            </div>
            <div className="_container text-center relativ">
                <div className="max-w-[200px] absolute bottom-30 max-lg:hidden">
                    <img src={shine} className='w-full' alt="" />
                </div>
                <div className="max-w-[200px] absolute top-50 right-80 max-2xl:right-30 max-lg:hidden">
                    <img src={lines} className='w-full' alt="" />
                </div>
                <h1 className='text-7xl mb-10 title max-md:text-5xl max-md:mb-5 max-sm:text-4xl'>Welcome to the Tea ToDo!</h1>
                <p className='max-w-200 m-auto mb-10 text'>
                    Create and organize tasks. Group related tasks together. Keep everything clear and
                    manageable in one central place. Start building your task lists now!
                </p>
                <Link to={"/home"}
                    className='text-lg p-4 border-1 inline rounded-sm cursor-pointer border-white hover:bg-white hover:text-black transition duration-300'>
                    Get started
                </Link>
            </div>
        </section>
    )
}

export default Home
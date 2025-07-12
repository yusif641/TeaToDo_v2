import { useGSAP } from '@gsap/react';
import React from 'react'
import shine from "@/shared/assets/gifs/shine.gif";
import lines from "@/shared/assets/gifs/lines.gif";
import gsap from "gsap";
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

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
            .to(".background", { x: -900, duration: 30, ease: "none" })
            .to(".background", { x: 0, duration: 30, ease: "none" });
    });

    return (
        <section className='pb-60 pt-100 relative h-[100vh]' id='home'>
            <div className="_container text-center relativ">
                <div className="max-w-[200px] absolute bottom-50">
                    <img src={shine} className='w-full' alt="" />
                </div>
                <div className="max-w-[200px] absolute top-50 right-80">
                    <img src={lines} className='w-full' alt="" />
                </div>
                <h1 className='text-7xl mb-10 title'>Welcome to the Tea ToDo!</h1>
                <p className='max-w-200 m-auto mb-10 text'>
                    Create and organize tasks. Group related tasks together. Keep everything clear and
                    manageable in one central place. Start building your task lists now!
                </p>
                <div 
                    className='text-lg p-4 border-1 inline rounded-sm cursor-pointer border-white hover:bg-white hover:text-black transition duration-300'>
                        Get started
                </div>
            </div>
        </section>
    )
}

export default Home
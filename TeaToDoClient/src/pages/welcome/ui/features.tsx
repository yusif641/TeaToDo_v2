import React from 'react'
import stars from "@/shared/assets/gifs/stars.gif";
import lamp from "@/shared/assets/gifs/lamp.gif";
import todo from "@/shared/assets/gifs/todo.gif";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText, ScrollTrigger);

const Features: React.FC = () => {
    useGSAP(() => {
        const featuresTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".features",
                start: "top top",
                end: "+=500"
            }
        });

        featuresTimeline
            .fromTo(".item-1", {
                opacity: 0,
                x: -700
            }, {
                opacity: 1,
                x: 0,
                duration: 1
            }).fromTo(".item-2", {
                opacity: 0,
                x: -1000
            }, {
                opacity: 1,
                x: 0,
                duration: 1
            }).fromTo(".item-3", {
                opacity: 0,
                x: -1300
            }, {
                opacity: 1,
                x: 0,
                duration: 1
            });
    });

    return (
        <section className="features" id='features'>
            <div className="max-w-[1400px] px-[15px] mx-auto py-20">
                <h2 className='text-4xl mb-10 text-center'>Features</h2>
                <div className="flex justify-between items-stretch">
                    <div className="item-1 flex flex-col justify-between">
                        <div className="mb-4 max-w-[300px]">
                            <img src={todo} className="w-full" alt="" />
                        </div>
                        <span className='text-2xl font-bold'>Task Groups</span>
                        <p className="mb-10 mt-5 max-w-80">
                            Bundle realted tasks together. Whether it's for projects, daily routines, or personal goals
                            – keep everything contained in clear collections.
                        </p>
                        <div className='text-lg p-4 border-1 text-center rounded-sm border-white hover:bg-white hover:text-black transition duration-300 cursor-pointer'>Get started</div>
                    </div>
                    <div className="item-2 flex flex-col justify-between">
                        <div className="mb-4 max-w-[300px]">
                            <img src={lamp} className="w-full" alt="" />
                        </div>
                        <span className='text-2xl font-bold'>Different types of tasks</span>
                        <p className="mb-10 mt-5 max-w-80">
                            Create different types of tasks, from simple tasks to quotes, thoughts, or full-fledged tasks.
                        </p>
                        <div className='text-lg text-center p-4 border-1 rounded-sm border-white hover:bg-white hover:text-black transition duration-300 cursor-pointer'>Get started</div>
                    </div>
                    <div className="item-3 flex flex-col justify-between">
                        <div className="mb-4 max-w-[300px]">
                            <img src={stars} className="w-full" alt="" />
                        </div>
                        <span className='text-2xl font-bold'>Decor</span>
                        <p className="mb-10 mt-5 max-w-80">
                            Make your task groups more colorful by using different emojis or background images
                        </p>
                        <div className='text-lg text-center p-4 border-1 rounded-sm border-white hover:bg-white hover:text-black transition duration-300 cursor-pointer'>Get started</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
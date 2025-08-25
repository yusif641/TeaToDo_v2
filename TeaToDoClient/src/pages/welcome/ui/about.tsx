import React from 'react'
import notes from "@/shared/assets/images/notes.jpg";
import pen from "@/shared/assets/images/pen.jpg";
import keyboard from "@/shared/assets/images/keyboard.jpg";
import cat from "@/shared/assets/gifs/cat.gif";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText, ScrollTrigger);

const About: React.FC = () => {
    useGSAP(() => {
        const aboutTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".about",
                start: "top top",
                end: "+=500"
            }
        });

        let aboutTitleSplit = SplitText.create(".about-title", { type: "words" });
        let aboutTextSplit = SplitText.create(".about-text", { type: "lines" });

        aboutTimeline
            .from(aboutTitleSplit.words, {
                duration: 1,
                y: 100,
                autoAlpha: 0,
                stagger: 0.05
            })
            .from(aboutTextSplit.lines, {
                duration: 1,
                y: 100,
                autoAlpha: 0,
                stagger: 0.2
            })
            .from(".storage_number-1", {
                innerText: 0,
                duration: 1,
                snap: {
                    innerText: 1
                }
            })
            .from(".storage_number-2", {
                innerText: 0,
                duration: 1,
                snap: {
                    innerText: 1
                }
            })
            .from(".storage_number-3", {
                innerText: 0,
                duration: 1,
                snap: {
                    innerText: 1
                }
            });
    });

    return (
        <section className='relative overflow-hidden about' id='about'>
            <div className="max-w-[1400px] px-[15px] mx-auto py-20">
                <h2 className='text-4xl mb-10 text-center max-sm:mb-7'>About us</h2>
                <div className="flex justify-between items-center gap-7 flex-wrap max-xl:flex-col max-xl:gap-32">
                    <div className="mx-auto max-xl:text-center">
                        <h3 className='text-4xl mb-3 about-title max-sm:text-3xl'>Simple Task Management!</h3>
                        <p className='max-w-160 mb-8 xl:about-text max-xl:text-center max-sm:text-sm'>
                            Organize your work effortlessly. Create task groups, add individual tasks, and
                            keep everything structured in one clean workspace. Perfect for focused productivity.
                            There will also be many new features in the future.
                        </p>
                        <div className="flex max-xl:justify-center">
                            <div className="border-r-2 border-accent pr-10 max-sm:pr-5">
                                <div>
                                    <span className='text-2xl storage_number-1 max-sm:text-xl'>8</span>
                                    <span className='text-2xl max-sm:text-xl'>k</span>
                                </div>
                                <p className='mt-1 max-sm:text-sm'>Users</p>
                            </div>
                            <div className="border-r-2 border-accent px-10 max-sm:text-xl max-sm:px-5">
                                <div>
                                    <span className='text-2xl storage_number-2'>15</span>
                                    <span className='text-2xl max-sm:text-xl'>+</span>
                                </div>
                                <p className='mt-1 max-sm:text-sm'>Reviews</p>
                            </div>
                            <div className="pl-10 max-sm:pl-5">
                                <div>
                                    <span className='text-2xl storage_number-3 max-sm:text-xl'>100</span>
                                    <span className='text-2xl max-sm:text-xl'>%</span>
                                </div>
                                <p className='mt-1 max-sm:text-sm'>Free to use</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-1 grid-cols-2 gap-5 max-w-[520px] relative mx-auto">
                        <div className="absolute top-0 translate-y-[-70%] right-0 w-32">
                            <img src={cat} alt="" className='w-full' />
                        </div>
                        <div className="col-span-2 overflow-hidden rounded-sm">
                            <img src={notes} alt="" className='rounded-sm w-full max-md:h-[300px] h-[500px] object-cover' />
                        </div>
                        <div className="max-h-[150px] overflow-hidden rounded-sm">
                            <img src={pen} alt="" className='rounded-sm w-full h-full object-cover' />
                        </div>
                        <div className="max-h-[150px] overflow-hidden rounded-sm">
                            <img src={keyboard} alt="" className='rounded-sm w-full object-cover' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
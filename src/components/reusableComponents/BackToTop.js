import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import 'react-circular-progressbar/dist/styles.css'
import { BsArrowUp } from "react-icons/bs";

export function BackToTop(){


    const [backToTop, setBackToTop] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 900){
                setBackToTop(true)
            } else {
                setBackToTop(false)
            } 
        })
    }, [])

    const scrollPercentage = () => {
    let scrollProgress = document.getElementById("progress");

    if (scrollProgress) {
        const pos  = document.documentElement.scrollTop;
        const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollValue = Math.round(pos * 100 / calcHeight);
        scrollProgress.style.background = `conic-gradient(#008fff ${scrollValue}%, #c0c0ff ${scrollValue}%)`;
    }
};



    if(typeof window !== 'undefined'){
        window.onscroll = scrollPercentage;
        window.onload = scrollPercentage;
    }

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <section className="scrollProgress">
            <div id="progress">
                <span id="progress-value"></span>
            </div>
        <div className="scrollButtonMobile" >
            
             <AnimatePresence>
             {backToTop && (
                 <motion.div
                 className="arrowDiv"
                 initial = {{opacity: 0}}
                 animate= {{opacity:1, rotate:360}}
                 exit = {{opacity: 0, rotate:180}}
                 transition= {{duration:1}}
                 >
                <BsArrowUp className="arrowDiv_Icon" onClick={scrollUp}  />
                </motion.div>
            )}
            </AnimatePresence> 
        </div>
        </section>
    )
}
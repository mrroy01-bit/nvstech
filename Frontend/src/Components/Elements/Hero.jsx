import { useEffect } from "react";
import Heroimg from "../img/hero.png"
import Logo from "../img/logo.png"
import { gsap } from "gsap";

const Hero = () => {
    useEffect(() => {
        // Animate heading
        gsap.from(".hero-heading", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
        });

        // Animate hero image
        gsap.from(".hero-image", {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
        });

        // Animate logo
        gsap.from(".hero-logo", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "back.out(1.7)",
        });

      
    }, []);

    return (
        <div className="min-h-screen pt-[100px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h1 className="hero-heading mt-[100px] text-5xl md:text-6xl lg:text-7xl font-normal text-center leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                        Future-Driven
                    </span><br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4389A2] to-[#1a1c2c]">
                        Development
                    </span><br />
                    <span className="text-2xl md:text-3xl text-gray-400 font-light mt-4 block">
                        Building tomorrow's solutions today
                    </span>
                </h1>
                
                <div className="relative mt-12 sm:mt-16">
                    <div className="hero-image relative z-10 flex justify-center">
                        <img 
                            src={Heroimg} 
                            alt="Hero visualization" 
                            className="w-full max-w-4xl rounded-lg "
                        />
                    </div>
                    
                    <div className="hero-logo absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <img 
                            src={Logo} 
                            alt="NVS Tech Logo" 
                            className="w-24 h-24 sm:w-32 sm:h-32 filter drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            {/* Background gradient effect */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-radial from-[#4389A2]/10 via-transparent to-transparent -z-10"></div>
        </div>
    );
}

export default Hero;

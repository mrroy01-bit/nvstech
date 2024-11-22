import React, { useRef, useEffect } from 'react';

const Animation1 = () => {
    const textRef = useRef(null);

    useEffect(() => {
        const text = textRef.current;
        const textArray = text.textContent.split("");
        text.textContent = "";
        let index = 0;

        const timer = setInterval(() => {
            text.textContent += textArray[index];
            index++;
            if (index >= textArray.length) {
                clearInterval(timer);
            }
        }, 100);
    }, []);

    return (
        <>
            <div className="animatio-card mt-10 mb-10 ml-[100px]">
                <div className="typewriter card-text w-[600px] h-[550px] bg-[#095A6E] rounded-xl p-10 text-white text-base font-semibold tracking-wide leading-relaxed" ref={textRef}>
                    <h2 className="mb-4">
                        Hello! I'm Ritik Kumar, a passionate Software Engineer and the CEO of NVS Tech, a cutting-edge technology company specializing in web and mobile app development. With a strong foundation in programming and an eye for innovative solutions, I strive to deliver high-quality digital experiences that drive success for businesses and individuals.
                    </h2>

                    <p className="mb-4">
                        At NVS Tech, we offer expertise in a variety of technologies, including ReactJS, Next.js, PHP, MongoDB, and more. We also provide robust cloud solutions with AWS, ensuring that our clients receive scalable, secure, and efficient software solutions tailored to their needs.
                    </p>

                    <p>
                        With years of experience in web development and coding, I take pride in leading a team that focuses on creating exceptional, user-friendly, and innovative applications. Whether it's designing sleek interfaces or developing powerful back-end systems, my goal is to bring visions to life through technology.
                    </p>
                </div>
                <div className="card-img"></div>
            </div>
        </>
    );
};

export default Animation1;




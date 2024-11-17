import { useRef, useEffect } from 'react';
import { gsap, Power3 } from 'gsap';
import slide1 from '../img/slide.png';
import slide2 from '../img/slide1.png';
import slide3 from '../img/slide2.png';
import slide4 from '../img/slide3.png';
import slide5 from '../img/slide4.png';
import slide6 from '../img/slide5.png';
import slide7 from '../img/slide6.png';

const Desing = () => {
    const slideRef = useRef(null);

    useEffect(() => {
        const slide = slideRef.current;
        const timeline = gsap.timeline({
            repeat: -1,
        });
        timeline.to(slide, {
            x: () => `-=${slide.scrollWidth - slide.clientWidth}`,
            duration: 10,
            ease: Power3.easeInOut,
        });
        timeline.to(slide, {
            x: 0,
            duration: 10,
            ease: Power3.easeInOut,
        });
    }, []);

    return (
        <div className="slide" >
            <div className="slide__container"ref={slideRef}>
                {[slide1, slide2, slide3, slide4, slide5, slide6, slide7].map((slide, index) => (
                    <img
                        key={index}
                        src={slide}
                        className="slide__img card"
                    />
                ))}
            </div>
        </div>
    );
};

export default Desing;


import { useEffect } from 'react'
import Nav from '../Components/Elements/Nav'
import hero from '../Assets/Img/hero-img.png'
import gsap from 'gsap'
import Footer from '../Components/Elements/Footer';
import Hero from '../Components/Elements/Hero';
import Animation from '../Components/Animation/Desing';

import Animatio1 from '../Components/Animation/animation1';

function Home() {
  useEffect(() => {
    // Hero image animation
    gsap.fromTo('.Image img', 
      {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

    // Floating animation
    gsap.to('.Image img', {
      y: -15,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Text animations
    gsap.fromTo('.Text h1',
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
      }
    );

    gsap.fromTo('.Text p',
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
      }
    );

    // Typewriter effect using modern class syntax
    class TypeWriter {
      constructor(element, words, period = 2000) {
        this.element = element;
        this.words = words;
        this.period = period;
        this.currentWordIndex = 0;
        this.text = '';
        this.isDeleting = false;
        this.tick();
      }

      tick() {
        const currentWord = this.words[this.currentWordIndex];
        
        // Calculate new text based on deleting/typing state
        this.text = this.isDeleting 
          ? currentWord.substring(0, this.text.length - 1)
          : currentWord.substring(0, this.text.length + 1);

        // Update DOM
        this.element.innerHTML = `<span class="wrap">${this.text}</span>`;

        // Calculate typing speed
        let delta = 150 - Math.random() * 50;
        if (this.isDeleting) delta /= 2;

        // Handle word completion
        if (!this.isDeleting && this.text === currentWord) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
          this.isDeleting = false;
          this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
          delta = 500;
        }

        setTimeout(() => this.tick(), delta);
      }
    }

    // Initialize typewriter effect for all elements
    const typewriteElements = document.getElementsByClassName('typewrite');
    Array.from(typewriteElements).forEach(element => {
      const words = JSON.parse(element.getAttribute('data-type') || '[]');
      const period = parseInt(element.getAttribute('data-period'), 10) || 2000;
      if (words.length) {
        new TypeWriter(element, words, period);
      }
    });

    // Add cursor style
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `.typewrite > .wrap { border-right: 0.08em solid #fff }`;
    document.head.appendChild(cursorStyle);

    return () => {
      document.head.removeChild(cursorStyle);
    };
  }, []);

  return (
    <>
      <Nav />
      <div className="welcome flex flex-row">
        <div className="Text flex flex-col mt-[30vh] ml-[20vh]">
          <h1 className="text-5xl font-bold leading-[55px]">Grow your business <br /><span className='text-3xl text-blue-500'>with NVS Tech</span></h1>
          <p className="text-lg mt-3 text-[#8F8F8F] text-[22px] font-medium">We are team of talented designers making websites <br /> <span className="typewrite text-[#3E8095] font-bold" data-period="2000" data-type='[ "React js", "Next js.", "MogoDB.", "Tailwind Css." ]'></span> </p>
        </div>
        <div className="Image mt-10 ml-10">
          <img src={hero} alt="hero" />
        </div>
      </div>
      <Hero />
      <Animation/>
      <Animatio1/>
      <Footer />
    </>
  )
}

export default Home

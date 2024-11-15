import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../img/logo.png'
import { FaLock } from "react-icons/fa";


function Nav() {
  useEffect(() => {
    const TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      const that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function() {
        that.tick();
      }, delta);
    };

    const element = document.querySelector('.typewrite');
    if (element) {
      new TxtType(element, ["NVS Tech"], 2000);
    }

    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000}";
    document.body.appendChild(css);

    return () => {
      document.body.removeChild(css);
    };
  }, []);

  return (
    <>
      <header className='flex justify-between items-center py-4 px-6 text-black shadow-lg h-[75px]'>
        <div className="logo font-semibold">
         <div className='flex'>
          <Link to= '/' className='flex'>
          <img src={logoImg} alt="logo" className='h-8 w-auto' />
          <h1 className='text-2xl font-bold typewrite'></h1>
          </Link>         
          </div>
        </div>
        <nav>
            <ul className="flex space-x-4 font-semibold">
                <Link to="/" className='hover:text-gray-400 mt-2'>Home</Link>
                <Link to="/about" className='hover:text-gray-400 mt-2'>About</Link>
                <Link to="/service" className='hover:text-gray-400 mt-2'>Service</Link>
                <Link to="/project" className='hover:text-gray-400 mt-2'>PortFolio</Link>
                <Link to="/blog" className='hover:text-gray-400 mt-2'>Blog</Link>
                <Link to="/contact" className='hover:text-gray-400 mt-2'>Contact</Link>
                <Link to='/login' className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors duration-200">
                <FaLock className="text-slate-600" />
                </Link>
            </ul>
            
        </nav>
      </header>
    </>
  )
}

export default Nav

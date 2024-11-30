import { Link } from 'react-router-dom';
import logoImg from '../img/logo.png'
import { FaLock } from "react-icons/fa";


function Nav() {

  return (
    <>
      <header className='flex  items-center py-4 px-6 text-white  h-[75px] mt-4'>
        <div className="logo font-semibold">
         <div className='flex'>
          <Link to= '/' className='flex'>
          <img src={logoImg} alt="logo" className='h-8 w-auto' />
          </Link>         
          </div>
        </div>
        <nav className="ml-[400px] flex justify-between">
            <ul className="flex  space-x-4 font-normal border-[1px] border-[#1344d6] pl-4 pr-4 py-3 rounded-full bg-[#1B1B59] ">
                <Link to="/" className='hover:text-gray-400 mt-2'>Home</Link>
                <Link to="/about" className='hover:text-gray-400 mt-2'>About</Link>
                <Link to="/service" className='hover:text-gray-400 mt-2'>Service</Link>
                <Link to="/project" className='hover:text-gray-400 mt-2'>PortFolio</Link>
                <Link to="/blog" className='hover:text-gray-400 mt-2'>Blog</Link>
                <Link to="/contact" className='hover:text-gray-400 mt-2'>Contact</Link>
               
            </ul>
            <Link to='/login' className="flex ml-[300px] items-center justify-center w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors duration-200">
                <FaLock className="text-slate-600" />
                </Link>
        </nav>
      </header>
    </>
  )
}

export default Nav

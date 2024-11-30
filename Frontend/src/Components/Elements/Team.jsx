import TeamImg from "../img/rb.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Team = () => {
  return (
    <>
      <div>
        <h1 className="text-5xl font-normal text-white text-center mt-[70px]">
          Our Team
        </h1>
        <p className="text-2xl font-normal text-white text-center mt-[50px]">
          We are united by our passion to bring <br />
          the decentralized data concept to the masses.
        </p>
      </div>
      <div className="flex justify-center w-[100%] h-[400px] mt-[200px]  gap-[50px]">
        <div className=" justify-center w-[300px] h-[390px] mt-2 rounded-[20px]  bg-[#222325]">
          <div className="w-[200px] h-[200px] bg-white ml-[50px]  mt-[-100px] rounded-full">
            <img src={TeamImg} alt="" />
          </div>
          <h3 className="ml-[100px] mt-3"> Ritik Kumar</h3>
          <p className="ml-[90px] text-[#8B9467]">Founder & CEO</p>
          <div className="flex gap-4 justify-center mt-[200px]">
            <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
            <a href="https://x.com/username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaXTwitter size={24} />
            </a>
          </div>
        </div>
        <div className=" justify-center w-[300px] h-[390px] mt-2 rounded-[20px]  bg-[#222325]">
          <div className="w-[200px] h-[200px] bg-white ml-[50px]  mt-[-100px] rounded-full">
            <img src={TeamImg} alt="" />
          </div>
          <h3 className="ml-[120px] mt-3">Sing ji</h3>
          <p className="ml-[120px] text-[#8B9467]">CTO</p>
          <div className="flex gap-4 justify-center mt-[200px]">
            <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
            <a href="https://x.com/username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaXTwitter size={24} />
            </a>
          </div>
        </div>
        <div className=" justify-center w-[300px] h-[390px] mt-2 rounded-[20px]  bg-[#222325]">
          <div className="w-[200px] h-[200px] bg-white ml-[50px]  mt-[-100px] rounded-full">
            <img src={TeamImg} alt="" />
          </div>
          <h3 className="ml-[100px] mt-3">Abhishek Kumar</h3>
          <p className="ml-[120px] text-[#8B9467]">Developer</p>
          <div className="flex gap-4 justify-center mt-[200px]">
            <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
            <a href="https://x.com/username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaXTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;

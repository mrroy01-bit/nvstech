import TeamImg from "../img/rb.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0A647A] to-[#0c8aa8] text-center mb-6">
          Our Team
        </h1>
        <p className="text-2xl font-light text-gray-300 text-center max-w-3xl mx-auto mb-24">
          We are united by our passion to bring
          <span className="block">the decentralized data concept to the masses.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Team Member 1 */}
          <div className="group relative">
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border border-gray-700/50 hover:border-[#0A647A]/30">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-32 rounded-full border-4 border-[#0A647A]/20 p-1 bg-gradient-to-r from-[#0A647A]/20 to-[#0c8aa8]/20 group-hover:border-[#0A647A]/40 transition-all duration-300">
                  <img src={TeamImg} alt="Ritik Kumar" className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <div className="mt-20 text-center">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#0A647A] transition-colors duration-300">Ritik Kumar</h3>
                <p className="text-[#8B9467] mb-6">Founder & CEO</p>
                <div className="flex justify-center gap-6 pt-6 border-t border-gray-700/30">
                  <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#0A647A] transform hover:scale-110 transition-all duration-300">
                    <FaGithub size={22} />
                  </a>
                  <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#0A647A] transform hover:scale-110 transition-all duration-300">
                    <FaLinkedin size={22} />
                  </a>
                  <a href="https://x.com/username" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#0A647A] transform hover:scale-110 transition-all duration-300">
                    <FaXTwitter size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="group relative">
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border border-gray-700/50 hover:border-[#0A647A]/30">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-32 rounded-full border-4 border-[#0A647A]/20 p-1 bg-gradient-to-r from-[#0A647A]/20 to-[#0c8aa8]/20 group-hover:border-[#0A647A]/40 transition-all duration-300">
                  <img src={TeamImg} alt="Sing ji" className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <div className="mt-20 text-center">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#0A647A] transition-colors duration-300">Sing ji</h3>
                <p className="text-[#8B9467] mb-6">CTO</p>
                <div className="flex justify-center gap-6 pt-6 border-t border-gray-700/30">
                  <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#0A647A] transform hover:scale-110 transition-all duration-300">
                    <FaGithub size={22} />
                  </a>
                  <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#0A647A] transform hover:scale-110 transition-all duration-300">
                    <FaLinkedin size={22} />
                  </a>
                  <a href="https://x.com/username" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#0A647A] transform hover:scale-110 transition-all duration-300">
                    <FaXTwitter size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="group relative">
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border border-gray-700/50 hover:border-[#0A647A]/30">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-32 rounded-full border-4 border-[#0A647A]/20 p-1 bg-gradient-to-r from-[#0A647A]/20 to-[#0c8aa8]/20 group-hover:border-[#0A647A]/40 transition-all duration-300">
                  <img src={TeamImg} alt="Abhishek Kumar" className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <div className="mt-20 text-center">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#0A647A] transition-colors duration-300">Abhishek Kumar</h3>
                <p className="text-[#8B9467] mb-6">Developer</p>
                <div className="flex justify-center gap-6 pt-6 border-t border-gray-700/30">
                  <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#0A647A] transform hover:scale-110 transition-all duration-300">
                    <FaGithub size={22} />
                  </a>
                  <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#0A647A] transform hover:scale-110 transition-all duration-300">
                    <FaLinkedin size={22} />
                  </a>
                  <a href="https://x.com/username" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#0A647A] transform hover:scale-110 transition-all duration-300">
                    <FaXTwitter size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

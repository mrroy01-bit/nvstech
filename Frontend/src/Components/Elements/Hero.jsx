import React from 'react';
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io5";
import { FaJs } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";
import { BiLogoVuejs } from "react-icons/bi";
import { GrMysql } from "react-icons/gr";
import { FaDatabase } from "react-icons/fa";
import { FaAws } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa6";
import { IoLogoFigma } from "react-icons/io5";
import { SiAdobephotoshop } from "react-icons/si";


function Hero() {
    return (
        <>
            <div className="text-center mt-[70px] text-white">
                <h1 className="text-xl font-extrabold  sm:text-3xl">Technology & Frameworks We Use For Design & Development</h1>
                <div className="flex lr-1  mt-12 gap-5  ml-[70px] ">
                    <div className="bg-white rounded-lg shadow-md p-4 w-64 ">
                        <h2 className="text-lg font-bold">Language</h2>
                        <ul className="pl-4 mt-2 space-y-2">
                            <li className="flex items-center space-x-2">
                                <FaHtml5 className="h-6 w-6 text-blue-500" />
                                <span>HTML</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <IoLogoCss3 className="h-6 w-6 text-blue-500" />
                                <span>CSS</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaJs className="h-6 w-6 text-blue-500" />
                                <span>JavaScript</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 w-64 ">
                        <h2 className="text-lg font-bold">Frameworks</h2>
                        <ul className=" pl-4 mt-2 space-y-2">
                            <li className="flex items-center space-x-2">
                                <RiReactjsLine className="h-6 w-6 text-blue-500" />
                                <span>ReactJS</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <SiNextdotjs className="h-6 w-6 text-blue-500" />
                                <span>NextJS</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <BiLogoVuejs className="h-6 w-6 text-blue-500" />
                                <span>VueJS</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 w-64 ">
                        <h2 className="text-lg font-bold">DataBase</h2>
                        <ul className=" mt-3 pl-4 mt-2 space-y-2">
                            <li className="flex items-center space-x-2">
                                <FaDatabase className="h-6 w-6 text-blue-500" />
                                <span>MongoDB</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <GrMysql className="h-6 w-6 text-blue-500" />
                                <span>MySQL</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 w-64 ">
                        <h2 className="text-lg font-bold">Other</h2>
                        <ul className=" pl-4 mt-2 space-y-2">
                            <li className="flex items-center space-x-2">
                                <FaGitAlt className="h-6 w-6 text-blue-500" />
                                <span>Git</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <IoLogoFigma className="h-6 w-6 text-blue-500" />
                                <span>Figma</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <SiAdobephotoshop className="h-6 w-6 text-blue-500" />
                                <span>Photoshop</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaAws className="h-6 w-6 text-blue-500" />
                                <span>Aws</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;


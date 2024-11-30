import Heroimg from "../img/hero.png"
import Logo from "../img/logo.png"
const Hero = () => {
    return (
        <>
            <div>
                <h1 className="text-5xl font-normal text-white text-center mt-[70px]">Building the next <br />
                    Data-as-an-Asset <br />
                    Solutions
                </h1>
                <div className="flex justify-center mt-[50px]">
                    <img src={Heroimg} alt="" />
                </div>
                <span className="flex justify-center mt-[-390px]">
                <img src={Logo} alt="" />
                </span>

            </div>
        </>
    );
}

export default Hero;

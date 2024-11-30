import TeamImg from "../img/rb.png";


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
        <div className="flex justify-center w-[300px] h-[390px] mt-2 rounded-[20px]  bg-[#222325]">
          <div className="w-[200px] h-[200px] bg-white mt-[-100px] rounded-full">
            <img src={TeamImg} alt="" />
            </div>
                     
        </div>  
        <div className="flex justify-center w-[300px] h-[390px] mt-2 rounded-[20px]  bg-[#222325]">
          <div className="w-[200px] h-[200px] bg-white mt-[-100px] rounded-full">
            <img src={TeamImg} alt="" />
            </div>          
        </div>  
        <div className="flex justify-center w-[300px] h-[390px] mt-2 rounded-[20px]  bg-[#222325]">
          <div className="w-[200px] h-[200px] bg-white mt-[-100px] rounded-full">
            <img src={TeamImg} alt="" />
            </div>          
        </div>      
      </div>
    </>
  );
};

export default Team;

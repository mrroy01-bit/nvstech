import Nav from '../Components/Elements/Nav'
import Hero from '../Components/Elements/Hero'
import Team from '../Components/Elements/Team'
import PreLoader from '../Components/Elements/PreLoader'
import Footer from '../Components/Elements/Footer'
import { useState, useEffect } from 'react'

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <PreLoader onLoadComplete={handleLoadComplete} />}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
        <Nav />
        <Hero />
        <Team />
        <Footer/>
      </div>
    </>
  )
}

export default Home

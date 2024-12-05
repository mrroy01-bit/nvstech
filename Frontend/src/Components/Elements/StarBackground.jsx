import { useEffect, useCallback } from 'react';

const StarBackground = () => {
  const createStar = useCallback(() => {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--twinkle-duration', `${2 + Math.random() * 3}s`);
    star.style.setProperty('--float-duration', `${5 + Math.random() * 5}s`);
    star.style.setProperty('--initial-opacity', Math.random().toFixed(2));
    return star;
  }, []);

  useEffect(() => {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';

    // Create initial stars
    const starCount = window.innerWidth < 768 ? 30 : 50;
    for (let i = 0; i < starCount; i++) {
      starsContainer.appendChild(createStar());
    }

    // Add stars container to body
    document.body.appendChild(starsContainer);

    // Periodically add new stars for a more dynamic effect
    const addNewStar = () => {
      if (starsContainer.children.length < starCount + 10) {
        const star = createStar();
        starsContainer.appendChild(star);
        
        // Remove star after animation
        setTimeout(() => {
          if (starsContainer.contains(star)) {
            starsContainer.removeChild(star);
          }
        }, 10000);
      }
    };

    const interval = setInterval(addNewStar, 2000);

    return () => {
      clearInterval(interval);
      if (document.body.contains(starsContainer)) {
        document.body.removeChild(starsContainer);
      }
    };
  }, [createStar]);

  return null;
};

export default StarBackground;

import gsap from 'gsap';
require('intersection-observer');

const intersectionAnim = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  };

  const animatedElements = [];
  let chain = Promise.resolve();

  function show(e) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        e.classList.add('active');
        res();
      }, 100);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        !entry.target.classList.contains('active') &&
        entry.intersectionRatio > 0
      ) {
        const elem = entry.target;
        animatedElements.push(elem);
        chain = chain.then(() => show(elem));
        observer.unobserve(entry.target);
      }
    });
  }, options);

  const sections = document.querySelectorAll('.appear-up');
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Banner Appear
  const borders = document.querySelectorAll('.banner__anim');
  const animBanner = () => {
    borders.forEach((border) => {
      border.classList.add('active');
    });
    setTimeout(() => {
      document.querySelector('.banner').classList.add('active');
      gsap.to('.appear', {
        duration: 1.4,
        x: 0,
        opacity: 1,
        ease: 'power4.out',
        stagger: 0.2,
      });
    }, 700);
  };

  const myImg = document.querySelector('#site-banner');
  if (myImg) {
    let bannerObserver = new IntersectionObserver((entry, bannerObserver) => {
      if (
        !entry[0].target.classList.contains('active') &&
        entry[0].intersectionRatio > 0
      ) {
        animBanner();
        bannerObserver.unobserve(entry[0].target);
      }
    });
    bannerObserver.observe(myImg);
  }
};
// End Banner

export default intersectionAnim;

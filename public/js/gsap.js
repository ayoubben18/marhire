gsap.registerPlugin(ScrollTrigger);

gsap.from('.nav-items', {
    duration: 2,
    opacity: 0.4,
    scale: 0.8,
    x: -80,
    ease: 'back'
});

gsap.from('.nav-ctas', {
    duration: 1.5,
    opacity: 0.4,
    scale: 0.8,
    x: 80,
    ease: 'back'
});

gsap.from('#first_section h2', {
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    ease: 'back'
});

gsap.from('#first_section .para', {
    duration: 1.5,
    opacity: 0,
    y: 10,
    x: 100,
    delay: 0.5,
    ease: 'back'
});

gsap.from('.svg-target > img', {
    duration: 1.5,
    opacity: 0,
    y: 10,
    scale: 0.5,
    delay: 1.7,
    ease: 'back'
});

gsap.from('.first-img-container > .main-img', {
    duration: 2,
    opacity: 0,
    y: 30,
    x: 50,
    scale: 0.7,
    delay: 0.5,
    ease: 'back'
});

gsap.from('.first-img-container > .second-img', {
    duration: 2,
    opacity: 0,
    y: 30,
    x: 50,
    scale: 0.7,
    delay: 1,
    rotate: 30,
    ease: 'back'
});

gsap.from('#search-container', {
    duration: 2.5,
    opacity: 0,
    scale: 0.8,
    x:-30,
    width: 180,
    delay: 2,
    ease: 'back'
});

gsap.from('#btn-signup-home', {
    scrollTrigger: {
        trigger: '#btn-signup-home'
    },
    duration: 1.5,
    opacity: 0,
    scale: 0.8,
    y:20,
    ease: 'back',
    onStart: () => button.style.transition = 'none',
    onComplete: () => button.style.transition = ''
});

gsap.from('.cta-section-container .nav-icon', {
    scrollTrigger: {
        trigger: '.cta-section-container .nav-icon'
    },
    duration: 2.5,
    stagger: 0.5,
    opacity: 0,
    x:-60,
    ease: 'back'
});

gsap.from('.img-box > img', {
    scrollTrigger: {
        trigger: '.img-box > img',
        start: 'top 90%'
    },
    duration: 2,
    opacity: 0,
    scale: 0.8,
    x:-100,
    y:120,
    ease: 'back'
});

gsap.from('#aboutus .head-section h1', {
    scrollTrigger: {
        trigger: '#aboutus .head-section h1',
        start: 'top 90%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    ease: 'back'
});

gsap.from('#aboutus p', {
    scrollTrigger: {
        trigger: '#aboutus p',
        start: 'top 90%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    ease: 'back'
});

gsap.from('.progress-item', {
    scrollTrigger: {
        trigger: '.progress-item',
        start: 'top 90%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.8,
    stagger: 0.2,
    y: 40,
    x: 60,
    ease: 'back'
});

gsap.from('#aboutus .btn', {
    scrollTrigger: {
        trigger: '#aboutus .btn',
        start: 'top 90%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    ease: 'back'
});

gsap.from('#services .head-section-title', {
    scrollTrigger: {
        trigger: '#services .head-section-title',
        start: 'top 70%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    ease: 'back'
});

gsap.from('#services h1', {
    scrollTrigger: {
        trigger: '#services h1',
        start: 'top 70%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    x:60,
    ease: 'back'
});

gsap.from('.box-container', {
    scrollTrigger: {
        trigger: '.box-container',
        start: 'top 70%'
    },
    overwrite: true,
    duration: 2.5,
    opacity:0,
    x: 160,
    stagger: 0.5,
    ease: 'back'
});

gsap.from('#tracking .head-section-title', {
    scrollTrigger: {
        trigger: '#tracking .head-section-title',
        start: 'top 70%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    ease: 'back'
});

gsap.from('#howitswork h1', {
    scrollTrigger: {
        trigger: '#howitswork h1',
        start: 'top 70%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    x:60,
    ease: 'back'
});

gsap.from('.howitswork-item', {
    scrollTrigger: {
        trigger: '.howitswork-item',
        start: 'top 70%'
    },
    duration: 2.5,
    opacity: 0,
    scale:0.8,
    stagger: {
        each: 0.5
    },
    y: 10,
    x: -60,
    ease: 'back'
});

gsap.from('.footer-cols > div', {
    scrollTrigger: {
        trigger: '.footer-cols > div',
        start: 'top 70%'
    },
    duration: 2,
    opacity: 0,
    scale:0.8,
    stagger: {
        each: 0.25,
        from: 'end'
    },
    y: 10,
    x: 60,
    ease: 'back'
});


gsap.from('#tracking h1', {
    scrollTrigger: {
        trigger: '#tracking h1',
        start: 'top 70%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    x:60,
    ease: 'back'
});

gsap.from('#tracking img', {
    scrollTrigger: {
        trigger: '#tracking img',
        start: 'top 90%'
    },
    duration: 2,
    opacity: 0,
    scale: 0.8,
    x:-100,
    y:120,
    ease: 'back'
});

gsap.from('#tracking p', {
    scrollTrigger: {
        trigger: '#tracking p',
        start: 'top 90%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    ease: 'back'
});

gsap.from('#tracking .list-verified-option > li', {
    scrollTrigger: {
        trigger: '#tracking .list-verified-option > li',
        start: 'top 90%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.8,
    stagger: 0.2,
    y: 40,
    x: 60,
    ease: 'back'
});

gsap.from('#tarifs_section .head-section-title', {
    scrollTrigger: {
        trigger: '#tarifs_section .head-section-title',
        start: 'top 70%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    ease: 'back'
});

gsap.from('#tarifs_section h1', {
    scrollTrigger: {
        trigger: '#tarifs_section h1',
        start: 'top 70%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    x:60,
    ease: 'back'
});

gsap.from('.table-tarifs-search #searchCityInput', {
    scrollTrigger: {
        trigger: '.table-tarifs-search #searchCityInput',
        start: 'top 70%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 4,
    x:-80,
    ease: 'back'
});
gsap.from('.home-map path', {
    scrollTrigger: {
        trigger: '.home-map path',
        start: 'top 70%'
    },
    duration: 1.5,
    opacity: 0,
    scale:0.1,
    y: 4,
    x:-80,
});

gsap.from('.footer-bottom', {
    scrollTrigger: {
        trigger: '.footer-bottom',
    },
    duration: 1.5,
    opacity: 0,
    scale:0.9,
    y: 40,
    x:60,
    ease: 'back'
});

$('.js-tilt').tilt({
    glare: true,
    maxGlare: .5
})
import gsap from 'gsap';

export const slideOpenMenuDown = (menuRef, menuInnerBG, menuInner, delay = 0.1) => {
    gsap.to(menuRef, 
        {
            css: {display: 'block'}
        }
    );

    gsap.to([menuInnerBG, menuInner], {
        duration: 0,
        opacity: 1,
        height: '100%',
        skewY: 0,
    });

    gsap.from([menuInnerBG, menuInner], 
        {
            delay: delay,
            duration: .8,
            height: 0,
            transformOrigin: 'right top',
            skewY: 4,
            ease: 'power3.inOut',
            stagger: {
              amount: 0.1
            }
        }
    );
}

export const slideOpenMenuRight = (menuRef, menuInnerBG, menuInner, delay = 0) => {
    gsap.to(menuRef, 
        {
            css: {display: 'block'},
        }
    );

    gsap.to([menuInnerBG, menuInner], {
        duration: 0,
        x: `0`,
        height: `100%`,
        skewX: 0,
        skewX: 0,
    });

    gsap.from([menuInnerBG, menuInner], 
        {
            delay: delay,
            duration: .9,
            x: `100%`,
            skewY: 4,
            ease: 'power3.inOut',
            stagger: {
              amount: 0.05
            }
        }
    );
}

export const slideCloseMenuLeft = (menuRef, menuInnerBG, menuInner) => {
    gsap.to([menuInner, menuInnerBG], 
        {
            duration: .8,
            ease: 'power3.inOut',
            skewX: 4,
            x: `-110%`,
            stagger: {
              amount: 0.07
            }
        }
    );

    gsap.to(menuRef, 
        {
            delay: 1,
            duration: 1,
            skewX: 0,
            skewY: 0,
            css: {display: 'none'}
        }
    );
}

export const slideCloseMenuUp = (menuRef, menuInnerBG, menuInner) => {
    gsap.to([menuInner, menuInnerBG], 
        {
            duration: .8,
            height: 0,
            transformOrigin: 'right top',
            ease: 'power3.inOut',
            skewY: 4,
            stagger: {
              amount: 0.07
            }
        }
    );

    gsap.to(menuRef, 
        {
            duration: 1,
            skewY: 0,
            css: {display: 'none'}
        }
    );
}

export const animateSideText = (sideTextRef, delay = .8, duration = .8) => {
    gsap.from(sideTextRef.children, 
        {
            delay: delay,
            duration: duration,
            transformOrigin: 'right top',
            opacity: 0,
            left: 5,
            ease: 'power3.inOut',
            stagger: {
              amount: 0.3
            }
        }
    );
}

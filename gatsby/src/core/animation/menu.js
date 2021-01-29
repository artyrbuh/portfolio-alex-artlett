import {TweenLite} from 'gsap';

export const slideOpenMenuDown = (menuRef, menuInnerBG, menuInner, delay = 0) => {
    TweenLite.to(menuRef, 
        {
            duration: delay,
            css: {display: 'block'}
        }
    );
    TweenLite.to([menuInnerBG, menuInner], {
        duration: 0,
        opacity: 1,
        height: '100%',
        skewY: 0,
      });
    TweenLite.from([menuInnerBG, menuInner], 
        {
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

export const slideCloseMenuUp = (menuRef, menuInnerBG, menuInner) => {
    TweenLite.to([menuInner, menuInnerBG], 
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

    TweenLite.to(menuRef, 
        {
            duration: 1,
            skewY: 0,
            css: {display: 'none'}
        }
    );
}

export const animateSideText = (sideTextRef) => {
    TweenLite.from(sideTextRef.children, 
        {
            delay: .8,
            duration: .4,
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
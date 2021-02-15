import {TweenLite} from 'gsap';

export const scaleInRotate = (ref, delay = 0) => {
    TweenLite.to(ref, {
        delay, 
        duration: 0.95,
        ease: 'elastic.out(1, 0.7)',
        scale: 1,
        rotate: 0
    })
}

export const scaleOutRotate = (ref, delay = 0) => {
    TweenLite.to(ref, {
        delay, 
        duration: 0.35,
        ease: 'power3.out',
        scale: 0,
        rotate: 45
    })
}

export const bgColourChange = (ref, colour, delay = 0) => {
    TweenLite.to(ref, {
        delay, 
        duration: 0.35,
        ease: 'power3.out',
        css: {backgroundColor: colour}
    })
}

export const staggerWidthsIn = (refs, delay = 0, stagger = 0.2) => {
    TweenLite.from(refs, {
        delay, 
        duration: 0.35,
        ease: 'power3.inOut',
        width: 0,
        stagger: {
            amount: stagger
        }

    })
}

export const staggerItemsSkewUpDown = (refs, delay = 0, y = 170, stagger = 0.3, duration = 1.2, skewY = 9, opacity = 1) => {
    TweenLite.from(refs, {
        delay: delay,
        duration: duration,
        y: y,
        skewY: skewY,
        opacity: opacity,
        ease: 'power3.inOut',
        stagger: {
            amount: stagger
        }
    });
}

export const staggerItemsTo = (refs, delay = 0, y = -170, stagger = 0.3) => {
    TweenLite.to(refs, {
        delay: delay,
        duration: 1.2,
        y: y,
        skewY: 9,
        ease: 'power3.inOut',
        stagger: {
            amount: stagger
        }
    });
}

export const staggerInFromLeft = (refs, delay = 0, stagger = 0.3) => {

    TweenLite.to(refs, {
        duration: 0,
        x: `-100%`,
    });


    TweenLite.to(refs, {
        delay: 0,
        duration: .75,
        x: `0`,
        ease: 'power3.easeInOut', 
        stagger: {
            amount: stagger
        }
    })
}

export const staggerOutToRight = (refs, delay = 0, stagger = 0.3) => {
    TweenLite.to(refs, {
        duration: 0,
        x: `0`,
        //css: {display: 'block'}
    });

    TweenLite.to(refs, {
        delay: 0,
        duration: .75,
        x: `100%`,
        ease: 'power3.easeInOut', 
        stagger: {
            amount: stagger
        }
    });

    TweenLite.to(refs, {
        delay: 1,
        x: `-100%`,
        ///css: {display: 'none'},
        duration: 0
    });
}

export const fadeUpFrom = (ref, delay = 0, y = 50, duration = .35) => {
    TweenLite.from(ref, {
        opacity: 0,
        y: y,
        duration: duration,
        delay: delay,
        skewY: 3
    });
}
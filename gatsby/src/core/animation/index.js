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
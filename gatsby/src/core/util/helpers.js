import React, { useState, useEffect } from "react";

export function useWindowSize() {
  function getSize() {
    return {
      width: typeof window !== "undefined" ? window.innerWidth : 0,
      height: typeof window !== "undefined" ? window.innerHeight: 0
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }
    if(typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    
    return () => { 
      if(typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    };
  }, []);

  return windowSize;
}


export const as_slug = (text) =>  text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');

export const slugify_array = (items) => items.map(item => as_obj(item));

export const as_obj = (name) => {
    return {
      name: name,
      slug: as_slug(name),
    }
}

// Gets the mouse position
export const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = typeof window !== "undefined" ? window.event : null;

  if(e !== null) {
    if (e.clientX || e.clientY) {
      posx = e.clientX;
      posy = e.clientY;
    }

    return { x: posx, y: posy };
  } else {
    return {x: 0, y: 0};
  }
};


// Linear interpolation
export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const calcWinsize = () => {
  if(typeof window !== "undefined") {
    return {width: window.innerWidth, height: window.innerHeight};
  } else {
    return {width: 0, height: 0};
  }
};

export const distance = (x1,y1,x2,y2) => {
  var a = x1 - x2;
  var b = y1 - y2;

  return Math.hypot(a,b);
}

export const textAsSpans = (text) => {
  return text.split('').map((el,i) => <span key={i}>{el}</span>);
}

export const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const isMobileOrTable = () => {
  if(typeof navigator !== "undefined") {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } else {
    return false;
  }
}

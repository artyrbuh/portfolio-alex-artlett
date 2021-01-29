import React, { useState, useEffect } from "react";

export function useWindowSize() {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
  if (!e) e = window.event;
  if (e.clientX || e.clientY) {
    posx = e.clientX;
    posy = e.clientY;
  }
  return { x: posx, y: posy };
};


// Linear interpolation
export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const calcWinsize = () => {
  return {width: window.innerWidth, height: window.innerHeight};
};

export const distance = (x1,y1,x2,y2) => {
  var a = x1 - x2;
  var b = y1 - y2;

  return Math.hypot(a,b);
}

export const textAsSpans = (text) => {
  return text.split('').map(el => <span>{el}</span>);
}
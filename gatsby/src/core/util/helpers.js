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

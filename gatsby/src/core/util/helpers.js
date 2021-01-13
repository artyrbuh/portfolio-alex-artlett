export const as_slug = (text) =>  text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');

export const slugify_array = (items) => items.map(item => as_obj(item));

export const as_obj = (name) => {
    return {
      name: name,
      slug: as_slug(name),
    }
}
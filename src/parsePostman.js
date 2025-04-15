// src/parsePostman.js
export function parsePostmanCollection(collection) {
  const flattened = {};

  const recurse = (items) => {
      localStorage.setItem('postman_collection', JSON.stringify(items))
  };
  
  recurse(collection);
  return flattened;
}

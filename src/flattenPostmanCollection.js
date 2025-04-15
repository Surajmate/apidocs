export function flattenPostmanCollection(collection) {
  const flattened = {};

  const recurse = (items) => {
    items.forEach((item) => {
      if (item.item) {
        recurse(item.item); // Folder
      } else {
        const id = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        flattened[id] = {
          id,
          name: item.name,
          method: item.request.method,
          endpoint: item.request.url.raw,
          description: item.request.description || 'No description provided.',
          response: JSON.stringify(item.response?.[0]?.body || { message: 'Dummy response' }, null, 2),
        };
      }
    });
  };

  recurse(collection.item);
  return flattened;
}

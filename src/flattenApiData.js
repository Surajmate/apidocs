// src/utils/flattenApiData.js
export const flattenApiData = (apiData) => {
    const flattened = {};
  
    Object.keys(apiData).forEach((key) => {
      const api = apiData[key];
      const id = key.toLowerCase().replace(/\s+/g, '-'); // Normalize the key to lower case and replace spaces
      flattened[id] = {
        id,
        name: api.title,
        method: api.method,
        endpoint: api.endpoint,
        headers: api.headers,
        body: api.body,
        response: JSON.stringify(api.response, null, 2),
      };
    });
  
    return flattened;
  };
  
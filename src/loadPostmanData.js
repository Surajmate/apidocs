import { parsePostmanCollection } from './parsePostman';

export async function loadPostmanData() {
  try {
    const response = await fetch('/Mulesoft.postman_collection.json');
    const rawCollection = await response.json();
    const parsedData = parsePostmanCollection(rawCollection);
    // localStorage.setItem('postman_collection', JSON.stringify(parsedData));
    // console.log("✅ API Collection Loaded and Flattened:", parsedData);
  } catch (error) {
    console.error("❌ Error loading collection:", error);
  }
}

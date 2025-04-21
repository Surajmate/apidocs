
export async function loadPostmanData() {
  try {
    // localStorage.setItem('postman_collection', JSON.stringify(parsedData));
    // console.log("✅ API Collection Loaded and Flattened:", parsedData);
  } catch (error) {
    console.error("❌ Error loading collection:", error);
  }
}

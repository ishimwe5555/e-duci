// Get the product ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
// Fetch product information based on the productId
// You can replace this with your actual fetch logic
async function fetchProductDetails(productId) {
  const response = await fetch(`http://localhost:5000/products/${productId}`);
  const result = await response.json();
  const product = result.data;
    // Replace this with your actual logic to fetch product details
    // For example, you might have an array of products or an API call
    return product;
}

// Fetch product details and populate the page
(async () => {
    try {
      const product = await fetchProductDetails(productId);
      console.log(product);
      document.getElementById('product-name').textContent = product.name;
      document.getElementById('product-description').textContent = product.description;
      document.getElementById('brand-name').textContent = product.brand;
      document.getElementById('product-price').textContent = `€${product.price}`;
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  })();
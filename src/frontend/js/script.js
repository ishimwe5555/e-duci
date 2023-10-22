let currentPage = 1; // Current page number

const container = document.getElementById("products-container");
// const pagination = document.querySelector(".aiz-pagination");
const searchBox = document.getElementById("search");

// Function to generate the pagination links
const generatePaginationLinks = (totalPages) => {
   const paginationList = document.getElementById("pagination-list");

   // Clear any existing pagination links
   paginationList.innerHTML = "";

   // Create the "Previous" link
   const previousLink = document.createElement("li");
   previousLink.classList.add("page-item");
   previousLink.classList.add("disabled");
   previousLink.innerHTML = `
      <span class="page-link" aria-hidden="true">&lsaquo;</span>
   `;
   paginationList.appendChild(previousLink);

   // Create the page links
   for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("li");
    pageLink.classList.add("page-item");
    if (i === currentPage) {
       pageLink.classList.add("active");
       pageLink.setAttribute("aria-current", "page");
    }
    pageLink.innerHTML = `
       <a class="page-link" href="#" data-page="${i}">${i}</a>
    `;
    paginationList.appendChild(pageLink);
 }

   // Create the "Next" link
   const nextLink = document.createElement("li");
   nextLink.classList.add("page-item");
   nextLink.innerHTML = `
      <a class="page-link" href="http://localhost:5000/products/all?page=${currentPage + 1}" rel="next" aria-label="Next »">&rsaquo;</a>
   `;
   paginationList.appendChild(nextLink);
};

///// IMPLEMENTING FILTERS

const filterForm = document.getElementById("search-form");

// Function to handle filter changes
const handleFilters = async () => {
  const formData = new FormData(filterForm);
  const filterData = {};
  formData.forEach((value, key) => {
     filterData[key] = value;
   });
   console.log(filterData);

  const filteredProducts = await searchproduct(filterData);
  container.innerHTML = "";
  filteredProducts.map(/* ... render products as you already do ... */);

  // Update pagination based on the number of pages in filteredProducts
  generatePaginationLinks(/* calculate number of pages */);
};
handleFilters();
///END OF FILTERS IMPLEMENTATIONS
let allProducts = [];
const retrieving = async (page) => {
const response = await fetch(`http://localhost:5000/products/all?page=${page}`);
  const result = await response.json();
  allProducts = result.products;
  container.innerHTML = ""; // Clear the container before adding new data

  const numberOfPages = result.totalPages
  // console.log(result);
  console.log(`pages number: ${result.totalPages}`);
  console.log(allProducts)

 // Update the pagination links
 generatePaginationLinks(numberOfPages);


  if(allProducts.length<1){
    container.innerHTML = '<h4>No Products!</h4>'
  }
  allProducts.sort((a, b) => a.createdAt - b.createdAt).reverse();
  allProducts.map((product) => {
    const productImage = new Image();
    productImage.src = product.productImages.url || 'http://res.cloudinary.com/duuznxvqs/image/upload/v1686867715/zdpoc3247bvzeixnzqps.png' ;
   const price = product.price || '5.00';
    container.innerHTML += `
    <div class="px-3">
    <div class="row gutters-16 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-4 row-cols-md-3 row-cols-2 border-top border-left">
     <div class="col-xl-12 col-md-12 border-right border-bottom has-transition hov-shadow-out z-1">
         <div class="aiz-card-box p-2 has-transition bg-white">
            <div class="row hov-scale-img">
               <div class="col-3 col-md-3 mb-3 mb-md-0">
                  <a href="product_detail.html?id=${product.id}" class="d-block overflow-hidden h-auto h-md-150px">
                  <img class="img-fluid lazyload mx-auto has-transition"
                     src=${productImage.src}
                     alt="norton" >
                  </a>
               </div>
               <div class="col">
                  <h3 class="fw-400 fs-14 text-dark text-truncate-2 lh-1-4 mb-3 h-35px d-none d-sm-block">
                     <a href="product_detail.html?id=${product.id}" class="d-block text-reset hov-text-primary">${product.name}</a>
                     <!-- Review -->
                  </h3>
                  <span class="rating rating-mr-1">
                     <i class = 'las la-star'></i><i class = 'las la-star'></i><i class = 'las la-star'></i><i class = 'las la-star'></i><i class = 'las la-star'></i>
                     </span>
                     <span class="ml-1 opacity-50 fs-14">(0
                     reviews)</span>
                  <div class="fs-14 mb-3">
                     <span class="text-secondary">by EDUCI</span><br>
                     <span class="fw-700 text-primary">€${price}</span>
                  </div>
                  <hr>
                  <div class="d-flex">
                     <!-- Add to wishlist button -->
                     <a href="javascript:void(0)" onclick="addToWishList(153)" class="mr-3 fs-14 text-dark opacity-60 has-transitiuon hov-opacity-100">
                         <i class="la la-heart-o mr-1"></i>
                         Add to wishlist
                     </a>
                     <!-- Add to compare button -->
                     <a href="javascript:void(0)" onclick="addToCompare(153)" class="fs-14 text-dark opacity-60 has-transitiuon hov-opacity-100">
                         <i class="las la-sync mr-1"></i>
                         Add to compare
                     </a>
                 </div>
                 <div class="mt-3">                                   
                     <a href="product_detail.html" type="button" class="btn btn-primary buy-now fw-600 add-to-cart min-w-150px rounded-0">Visit now</a>
                 </div>
               </div>
            </div>
         </div>
      </div>
    </div>
 </div>`;
  });
};
// Event listener for pagination links
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".page-link")) {
       event.preventDefault();
       const page = target.getAttribute("data-page");
       currentPage = parseInt(page);
       retrieving(currentPage);
    }
 });
 
window.onload = () => {
  retrieving(currentPage);
};


//---UPDATE BLOG---
// console.log('data');

// function fetchData() {
// axios.get('localhost:5000/products/all')
//  .then(function (response) {
//    // Handle the response
//    const data = response.data;
//      console.log(data);
//    // Update the HTML page with the fetched data
//    // const element = document.getElementById('data-container');
//    // element.innerHTML = data;
//  })
//  .catch(function (error) {
//    // Handle any errors
//    console.error('Error is:', error);
//  });
// }

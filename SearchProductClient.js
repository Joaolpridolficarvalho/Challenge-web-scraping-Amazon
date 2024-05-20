
const searchField = document.getElementById('search')
searchField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchField.value;
        deserializeData(searchTerm);
    }
})

async function searchProducts(searchTerm) {
    const url = `http://localhost:3000/searchproducts?searchTerm=${searchTerm}`

    try {
        const response = await axios.get(url, Headers = { 'Access-Control-Allow-Origin': 'http://localhost/1' , 'Content-Type': 'application/json', host: 'localhost:3000'})
        return response.data
    } catch (error) {
        console.error('Error:', error)
    }
}
async function deserializeData(searchTerm) {
    const data = await searchProducts(searchTerm);
    if (!data || !data.response) {
        console.error('No data returned from searchProducts');
        return;
    }
    const products = data.response;
    products.forEach(product => {
        console.log(product);
        listProduct(product);
    });
    
}

function listProduct(product){
    const body = document.querySelector('body')
    const verticalDistanceBetweenProducts = 20 
    const horizontalDistanceBetweenProducts = 20 

    const productContainer = document.createElement('div');
    productContainer.style.display = 'flex';
    productContainer.style.flexDirection = 'column';
    productContainer.style.marginRight = `${horizontalDistanceBetweenProducts}px`;
    productContainer.style.marginBottom = `${verticalDistanceBetweenProducts}px`;
    productContainer.appendChild(body);

    const name = document.createElement('h1')
    name.textContent = product.name
    name.classList.add('productName')
    productContainer.appendChild(name);

    const review = document.createElement('p')
    review.classList.add('productReview')
    review.textContent = product.review
    productContainer.appendChild(review);

    const stars = document.createElement('p')
    stars.textContent = product.stars
    stars.classList.add('productStars')
    productContainer.appendChild(stars);

    const image = document.createElement('img')
    image.src = product.image
    image.classList.add('productImage')
    image.alt = product.name
    productContainer.appendChild(image);
}


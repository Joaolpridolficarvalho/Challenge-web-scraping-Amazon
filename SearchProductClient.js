const axios = require('axios')

async function searchProducts(searchTerm) {
    const url = `http://localhost:3000/searchproducts?searchTerm=${searchTerm}`

    try {
        const response = await axios.get(url)
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
    });
    return products;
}

function listProduct(product){
    const name = document.createElement('h1')
    name.textContent = product.name
    name.classList.add('productName')
    const review = document.createElement('p')
    review.classList.add('productReview')
    review.textContent = product.review
    const stars = document.createElement('p')
    stars.textContent = product.stars
    stars.classList.add('productStars')
    const image = document.createElement('img')
    image.src = product.image
    image.classList.add('productImage')
    image.alt = product.name

}
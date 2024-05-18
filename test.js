function searchProducts(searchTerm) {
    const url = `http://localhost:3000/searchproducts?searchTerm=${searchTerm}`;

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}searchProducts('laptop');
'use strict';
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getPage(searchTerm) {
    return axios.get(`https://www.amazon.com.br/s?k=${searchTerm}`, {
        headers: {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            host: 'amazon.com',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            pragma: 'no-cache',
            'upgrade-Insecure-Requests': '1',
            TE: 'trailers'
        }
    })
}

async function extractImage(searchTerm) {
    const response = await getPage(searchTerm)
    const dom = new JSDOM(response.data)
    let imageProduct = []
    for (let i = 0; i < dom.window.document.querySelectorAll('img').length; i++){
        const image = dom.window.document.querySelectorAll('img')[i].src
        imageProduct.push(image)
    }
    return imageProduct
}

async function extractText(searchTerm, tag) {
    const response = await getPage(searchTerm)
    const dom = new JSDOM(response.data)
    let dataProduct = []
    for (let i = 0; i < dom.window.document.querySelectorAll(tag).length; i++){
        const data = dom.window.document.querySelectorAll(tag)[i].textContent
        dataProduct.push(data)
    }  
    return dataProduct
}

async function response() {
    const productImage = await extractImage('iphone')
    const productName = await extractText('iphone', '.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-4')
    const productReview = await extractText('iphone', '.a-size-base.s-underline-text')
    return {productImage, productName, productReview}
}

async function organizeData() {
    const data = await response()
    let product = []
    for (let i = 0; i < data.productImage.length; i++){
        product.push({image: data.productImage[i], name: data.productName[i], review: data.productReview[i]})
    }
    return product
}

organizeData().then((data) => {
    console.log(data)
})
























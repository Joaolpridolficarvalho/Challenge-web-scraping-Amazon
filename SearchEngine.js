'use strict';

const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
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
    let images = dom.window.document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++){
        const image = images[i].src
        imageProduct.push(image)
    }
    return imageProduct
}
async function extractText(searchTerm, className) {
    const response = await getPage(searchTerm)
    const dom = new JSDOM(response.data)
    let dataProduct = []
    for (let i = 0; i < dom.window.document.getElementsByClassName(className).length; i++){
        const data = dom.window.document.getElementsByClassName(className)[i].textContent
        dataProduct.push(data)
    }  
    return dataProduct
}

async function response(searchTerm) {
    const productImage = await extractImage(searchTerm, 's-image')
    const productName = await extractText(searchTerm, 'a-size-medium a-color-base a-text-normal')
    const productReview = await extractText(searchTerm, 'a-size-base s-underline-text')
    return {productImage, productName, productReview}
}

async function organizeData(searchTerm) {
    const data = await response(searchTerm)
    let product = []
    for (let i = 0; i < data.productImage.length; i++){
        if (data.productName[i])
            product.push({image: data.productImage[i], name: data.productName[i], review: data.productReview[i]})
    }
    return product
}


module.exports = {organizeData}



















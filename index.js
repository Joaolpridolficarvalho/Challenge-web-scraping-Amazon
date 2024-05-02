const axios = require('axios');


function getAmazonData(searchTerm) {
    return axios.get(`https://www.amazon.com.br/s?k=${searchTerm}`, Headers = {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        host: 'amazon.com',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        pragma: 'no-cache',
        'upgrade-Insecure-Requests': '1',
        TE: 'trailers'})
}

getAmazonData('laptop')
    .then(data => console.log(data.data));


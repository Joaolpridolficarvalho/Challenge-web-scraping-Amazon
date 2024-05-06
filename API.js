const express = require('express'); 
const app = express();
const { organizeData } = require('./SearchEngine.js');

app.get('/searchproducts', (req, res) => {
    organizeData(req.query.searchTerm).then((data) => {
        res.json({'response': data});
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
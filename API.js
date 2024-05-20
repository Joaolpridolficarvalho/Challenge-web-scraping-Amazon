const express = require('express'); 
const cors = require('cors');
const app = express();
const { organizeData } = require('./SearchEngine.js');

app.use(cors());

app.get('/searchproducts', cors(), (req, res) => {
    organizeData(req.query.searchTerm).then((data) => {
        res.json({'response': data});
    })
})

app.listen(3000, () => {
    console.log('listening on http://localhost:3000')
})
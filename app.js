const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('My real name is Daisy');
});

app.get('/sum', (req, res) =>{
    const ans = parseInt(req.query.a) + parseInt(req.query.b);
    res.send(`My name is Daisy, here is math: a is ${req.query.a}, b is ${req.query.b} and c is ${ans}`);
})

app.get('/cipher', (req, res) =>{
    const inputString = req.query.text.split('');
    const shift = req.query.shift;
    const ans = inputString.map((char) =>{
        let res = char.charCodeAt(0);
        if(res - shift < 65){
            res = res + 26;
        }
        res = res - shift; 
        return String.fromCharCode(res);
    });
    res.send(ans.join());
})

app.get('/lotto', (req, res) =>{

    let reso = req.query.numbers.map(num =>{
        return parseInt(num);
    })

    res.send(reso);
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});
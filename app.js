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

function getRand() {
    return  Math.ceil(Math.random() * 20 );
}

app.get('/lotto', (req, res) =>{

    let reso = req.query.numbers.map(num =>{
        return parseInt(num);
    });

    let draw = [];
    for(let i = 0; i < 6; i++){
        let numDraw = getRand();
        while(draw.includes(numDraw)){
            numDraw = getRand();
        }
        draw.push(numDraw);
    }
    let resNum = 0;
    draw.forEach((num) =>{
        if(reso.includes(num)){
            resNum++;
        }
    });

    let resString ="Sorry, you lose";
    switch(resNum){
        case 4:{
            resString = "Congratulations, you win a free ticket";
            break;
        }
        case 5: {
            resString = "Congratulations! You win $100!";
            break;
        }
        case 6:{
            resString = "Wow! Unbelievable! You could have won the mega millions!";
            break;
        }

    }

    res.send(resString);
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const md5 = require('md5')
const helmet = require('helmet')
var bodyParser = require('body-parser')
const HmacSha526 = require('./HmacSha526')
const { type } = require('express/lib/response')
const url = '/v1/test-new-employee';
const cookieSession = require('cookie-session')
const api_helper = require('./API_helper')
const { default: axios } = require('axios')

const app = express()
const port = 3000

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));


const generateDateTime = () => {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
    console.log(year + "-" + month + "-" + date);

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}


app.post(url, (req, res) => {
    const method = req.method;
    const body = md5(req.body);console.log(body);
    const containType = req.headers['content-type'];
    const datetime = generateDateTime();
    const concat = "POST"+"\n"+body+"\n"+containType+"\n"+datetime+"\n"+url;
    // const concat = 'POST'+body+containType+datetime+url;
   
    var headers = {
        maxBodyLength : '100' ,
        maxContentLength : '100',
        headers : {
            'Accept' : containType,
            'content-type': containType,
            'API-KEY' : 'ojh545we4t5254sdgfsaefstg65478',
            'Signature' : HmacSha526.hmacsha256(concat),
            'Signature-time' : Math.floor(Date.now(datetime) / 1000),
        },
        auth: {
            username: 'linc-test1',
            password: '123456'
        }
    } 


    axios.post('https://integrasi.delapancommerce.com'+url,req.body,headers)
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.error(error.response.data)
        res.send(error)
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
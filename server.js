const express = require('express');
require('dotenv').config();

//Constants
const port = 5001;

//App
const app = express(); // 새로운 Express 어플 생성
app.use(express.json());
const productRoutes = require('./routes');

const client = require('mongoose');
const url = process.env.MONGODB_URL;

client
  .connect(url)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/products', productRoutes); //request.body로 파라미터를 받아오기 위함

app.get('/', (req, res) => {
  // '/' 이 경로로 요청이 오면 'Hello World'를 결과값을 전달
  res.send('Hello World');
});

//해당 포트에서 HTTP 서버를 시작
app.listen(port);
console.log(`Running on ${port}`);

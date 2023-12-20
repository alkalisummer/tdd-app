const express = require('express');

//Constants
const port = 5001;

//App
const app = express(); // 새로운 Express 어플 생성
const productRoutes = require('./routes');
var client = require('mongodb').MongoClient;

client.connect(process.env.MONGODB_URL, (error, db) => {
  if (error) {
    console.log(error);
  } else {
    console.log('connected:' + db);
    db.close();
  }
});

app.use('/api/products', productRoutes); //request.body로 파라미터를 받아오기 위함

app.get('/', (req, res) => {
  // '/' 이 경로로 요청이 오면 'Hello World'를 결과값을 전달
  res.send('Hello World');
});

//해당 포트에서 HTTP 서버를 시작
app.listen(port);
console.log(`Running on ${port}`);

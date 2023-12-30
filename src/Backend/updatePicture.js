const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const couchbase = require('couchbase')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const imageId = uuidv4(); // 生成一个UUID作为图像ID
const bodyParser = require('body-parser');



app.use(bodyParser.json({ limit: '10mb' }));


require('dotenv').config();

app.use(cors());
app.use(express.json());

// 处理 "/api/GetPhoto" 路径的路由
app.post('/api/GetPhoto', (req, res) => {
  async function main() {

    const username = process.env.COUCHBASE_USERNAME; 
    const password = process.env.COUCHBASE_PASSWORD; 
    // const username = "Admin";
    // const password = "blackboard";
    const clusterConnStr = 'couchbase://localhost'
    const timestamp = Date.now();
  
    const cluster = await couchbase.connect(clusterConnStr, {
      username: username,
      password: password,
    })
    // end::connect[]

    const course = req.body.course;
    const semester = req.body.semester;
    const imageBase64 = req.body.imageBase64;

    
  
    const documentData = {
      image: imageBase64,
      course: course,
      semester: semester,
      timestamp: timestamp
  
    };
  
    const bucket = cluster.bucket("black-board");
    // const scopeName = course
  
    // Get a reference to the default collection, required only for older Couchbase server versions
  
    const collection = bucket.scope('CoursePicture').collection('Picture')
  
    try {
      await collection.upsert(imageId, documentData);
      let getResult = await collection.get(imageId)
      res.status(200).json({
        message: "Successfully processed the data!",
        getResult: JSON.stringify(getResult) // 將您需要的數據放入getResult中
      });
      
    } catch (error) {
      // 发生错误时发送错误响应
      res.status(500).json({ error: 'Internal Server Error' });
      res.status(413).send("Request Entity Too Large");

    }
  
  }

  main()
  .catch((err) => {
    console.log('ERR:', err)
    process.exit(1)
  })
  .then(process.exit)
  
});

// app.post('/api/GetPhoto', (req, res) => {
//   const course = req.body.course; // 从请求体中获取course数据

//   // 在这里处理course数据，例如将它保存到数据库或进行其他操作

//   // 假设您处理了course数据并得到了结果result
//   const result = { message: `Received course: ${course}` };

//   // 发送处理结果给前端
//   res.json(result);
// });



app.get('/api/course', (req, res) => {

  res.json({ message: 'Photo data from Express.js API' });
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

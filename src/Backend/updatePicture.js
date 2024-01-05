const express = require('express');
require('dotenv').config({path:'./process.env'});
const username = process.env.COUCHBASE_USERNAME; 
const password = process.env.COUCHBASE_PASSWORD; 

const app = express();
const cors = require('cors');
const port = 5000;
const couchbase = require('couchbase')
const { v4: uuidv4 } = require('uuid');
const imageId = uuidv4(); // 生成一个UUID作为图像ID
const bodyParser = require('body-parser');



app.use(bodyParser.json({ limit: '10mb' }));

// app.use(cors());
app.use(express.json());

app.post('/api/GetPhoto', (req, res) => {
  async function main() {

    const clusterConnStr = 'couchbase://localhost'
    const timestamp = Date.now();
  
    const cluster = await couchbase.connect(clusterConnStr, {
      username: username,
      password: password,
    })

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

    } finally {
      // 在不论成功还是失败时都关闭数据库连接
      cluster.close();
}
  
  }

  main()
  .catch((err) => {
    console.log('ERR:', err)
  })
  
});



app.get('/api/queryDistinctValue', async (req, res) => {
  try {
    const key1 = 'course';
    const key2 = 'semester';

    const distinctValues = await main(key1, key2);
    
    // 将course和semester组合成对象的形式
    const combinedValues = distinctValues.map(item => ({
      course: item[key1],
      semester: item[key2]
    }));

    res.status(200).json({
      combinedValues: combinedValues
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  async function main(key1, key2) {
    const clusterConnStr = 'couchbase://localhost';
  
    const cluster = await couchbase.connect(clusterConnStr, {
      username: username,
      password: password,
    });
  
    try {
      const query = `SELECT DISTINCT ${key1}, ${key2} FROM \`black-board\`.\`CoursePicture\`.\`Picture\` WHERE ${key1} IS NOT MISSING AND ${key2} IS NOT MISSING`;
      const options = {
        parameters: [key1, key2]
      };
  
      const result = await cluster.query(query, options);
      const combinedValues = result.rows.map(row => ({
        [key1]: row[key1],
        [key2]: row[key2]
      }));
      return combinedValues;
    } finally {
      // 在不论成功还是失败时都关闭数据库连接
      cluster.close();
}
};


app.post('/api/GetCoursePhoto', async (req, res) => {
    async function main() {

      const clusterConnStr = 'couchbase://localhost'

      const cluster = await couchbase.connect(clusterConnStr, {
        username: username,
        password: password,
      })
  
      const course = req.body.course;
      const semester = req.body.semester;

      const query = `SELECT DISTINCT image FROM \`black-board\`.\`CoursePicture\`.\`Picture\` WHERE course = '${course}';`;
      const options = {
        parameters: [course, semester]
      };
    
      const bucket = cluster.bucket("black-board");
    
      const collection = bucket.scope('CoursePicture').collection('Picture')
    
      try {
        const result = await cluster.query(query, options);
        const images = result.rows.map(item => item.image);
        // console.log(result);
        res.status(200).json({image: images}); // 将结果发送回客户端
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // 发送错误响应到客户端
      } finally {
        // 在不论成功还是失败时都关闭数据库连接
        cluster.close();
  }
      
    }
    main()
  .catch((err) => {
    console.log('ERR:', err)
  })

})

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

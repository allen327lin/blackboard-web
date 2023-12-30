const couchbase = require('couchbase')
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cluster = require('cluster');



app.use(cors());


let clusterInstance;
async function startServer() {

    const clusterConnStr = 'couchbase://localhost';
    const username = 'Admin';
    const password = 'blackboard';
    const bucketName = 'black-board';
    const timestamp = Date.now();


    try {
        clusterInstance = await couchbase.connect(clusterConnStr, {
            username: username,
            password: password,
            kvTimeout: 60000,
            queryTimeout: 60000
        });

        const bucket = clusterInstance.bucket(bucketName);
        const collection = bucket.defaultCollection();

        app.use(bodyParser.json());

        // 处理前端发送的照片数据
        app.post('/api/photos', async (req, res) => {
            const imageId = uuidv4();
            const {dataURL, Course} = req.body;

            const course = Course;
            const semester = '110-1';
            const imageBase64 = Buffer.from(dataURL.split(',')[1], 'base64');
            const documentData = {
                image: imageBase64,
                course: course,
                semester: semester,
                timestamp: timestamp
            };

            console.log('Cluster instance initialized successfully:', clusterInstance);

            // 在 await collection.upsert(imageId, documentData); 之後添加錯誤處理
            try {

                await collection.upsert(imageId, documentData);

                // Load the Document and print it
                // Prints Content and Metadata of the stored Document
                let getResult = await collection.get(imageId)
                console.log('Get Result: ', getResult)

                res.status(200).send('Photo saved successfully!');
            } catch (error) {
                console.error('Error upserting document:', error);
                res.status(500).send('Internal Server Error');
            }

        });

        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    }
    catch (error) {
        console.error('启动服务器时出错：', error);
    } finally {
        await clusterInstance.close(); // 关闭正确的集群实例
    }
}


startServer().catch(error => {
    console.error('Error starting the server:', error);
});

const couchbase = require('couchbase')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const imageId = uuidv4(); // 生成一个UUID作为图像ID



async function main() {
    const clusterConnStr = 'couchbase://www.blackboard.services'
    const username = 'Admin'
    const password = 'blackboard'
    const bucketName = 'black-board'

    const timestamp = Date.now();

    const imagePath = '../Pictures/blackboard.jpg';
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');


    const cluster = await couchbase.connect(clusterConnStr, {
        username: username,
        password: password,
    })
    // end::connect[]

    const course = 'Math';
    const semester = '110-2';
    const imageData = imageBuffer.toString('base64'); // 如果需要Base64编码的话
    const documentData = {
        image: imageBase64,
        course: course,
        semester: semester,
        timestamp: timestamp

    };

    const bucket = cluster.bucket(bucketName)

    // Get a reference to the default collection, required only for older Couchbase server versions
    const collection = bucket.defaultCollection()

    // const collection = bucket.scope('image').collection(course)



    // Create and store a document
    await collection.upsert(imageId, documentData);

    // Load the Document and print it
    // Prints Content and Metadata of the stored Document
    let getResult = await collection.get(imageId)
    console.log('Get Result: ', getResult)
}

// Run the main function
main()
    .catch((err) => {
        console.log('ERR:', err)
        process.exit(1)
    })
    .then(process.exit)










// const couchbase = require('couchbase')
// const { v4: uuidv4 } = require('uuid');
// const imageId = uuidv4(); // 生成一个UUID作为图像ID
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const cluster = require('cluster');



// app.use(cors());
//
//
// let clusterInstance;
// async function startServer() {
//
//     const clusterConnStr = 'couchbase://192.168.50.17:8091';
//     const username = 'Admin';
//     const password = 'blackboard';
//     const bucketName = 'black-board';
//     const timestamp = Date.now();
//
//
//     try {
//         const clusterInstance = await couchbase.connect(clusterConnStr, {
//             username: username,
//             password: password,
//             kvTimeout: 60000,
//             queryTimeout: 60000
//         });
//
//         const bucket = clusterInstance.bucket(bucketName);
//         const collection = bucket.defaultCollection();
//
//         app.use(bodyParser.json());
//
//         // 处理前端发送的照片数据
//         app.post('/api/photos', async (req, res) => {
//             const {dataURL, Course} = req.body;
//
//             const course = Course;
//             const semester = '110-1';
//             const imageBase64 = Buffer.from(dataURL.split(',')[1], 'base64');
//             const documentData = {
//                 image: imageBase64,
//                 course: course,
//                 semester: semester,
//                 timestamp: timestamp
//             };
//
//             console.log('Cluster instance initialized successfully:', clusterInstance);
//
//             // 在 await collection.upsert(imageId, documentData); 之後添加錯誤處理
//             try {
//
//                 await collection.upsert(imageId, documentData);
//
//                 // Load the Document and print it
//                 // Prints Content and Metadata of the stored Document
//                 let getResult = await collection.get(imageId)
//                 console.log('Get Result: ', getResult)
//
//                 res.status(200).send('Photo saved successfully!');
//             } catch (error) {
//                 console.error('Error upserting document:', error);
//                 res.status(500).send('Internal Server Error');
//             }
//
//         });
//
//         app.listen(5000, () => {
//             console.log('Server is running on port 5000');
//         });
//     }
//     catch (error) {
//         console.error('启动服务器时出错：', error);
//     } finally {
//         await clusterInstance.close(); // 关闭正确的集群实例
//     }
// }
//
//
// startServer().catch(error => {
//     console.error('Error starting the server:', error);
// });

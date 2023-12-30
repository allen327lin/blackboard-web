const couchbase = require('couchbase')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const imageId = uuidv4(); // 生成一个UUID作为图像ID



async function main() {
  // tag::connect[]
  // For a secure cluster connection, use `couchbases://<your-cluster-ip>` instead.
  const clusterConnStr = 'couchbase://localhost'
  const username = 'Admin'
  const password = 'blackboard'
  const bucketName = 'black-board'

  const timestamp = Date.now();
  
  const imagePath = './src/Pictures/blackboard.jpg';
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
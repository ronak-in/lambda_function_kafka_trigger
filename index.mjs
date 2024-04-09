import { Kafka } from 'kafkajs';
import AWS from 'aws-sdk';

// Configure the Kafka client
const kafka = new Kafka({
  clientId: 'my-lambda-producer',
  brokers: [':9092']
});

const producer = kafka.producer();

// Configure the AWS SDK
const s3 = new AWS.S3();

const handler = async (event, context) => {
  // Extract the bucket name and file key from the S3 event
  const bucketName = event.Records[0].s3.bucket.name;
  const fileKey = event.Records[0].s3.object.key;

  // Create the message to be sent to Kafka
  const message = `${bucketName}:${fileKey}`;

  console.log('Message to be sent to Kafka:', message);

  // Connect to the Kafka broker
  console.log('Connecting to Kafka broker...');
  await producer.connect();
  console.log('Connected to Kafka broker');

  // Send the message to the Kafka topic
  console.log('Sending message to Kafka topic...');
  await producer.send({
    topic: '',
    messages: [{ value: message }]
  });
  console.log('Message sent to Kafka topic');

  // Disconnect from the Kafka broker
  console.log('Disconnecting from Kafka broker...');
  await producer.disconnect();
  console.log('Disconnected from Kafka broker');

  return {
    statusCode: 200,
    body: 'Message sent to Kafka successfully'
  };
};

export { handler };
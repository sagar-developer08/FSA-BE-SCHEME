// app.js
const express = require('express');
const sequelize = require('./config/databaseConfig');
const schemaRoutes = require('./routes/schemeRoutes');
const AWS = require('./config/awsConfig');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken')
const { authenticateUser, authorizeUser } = require('./middleware/authMiddleware');
const cors = require('cors')

app.use(cors())
app.use('/api',authenticateUser,schemaRoutes);

// 


const processLoginMessage = async (message) => {
  try {
    const messageData = JSON.parse(message.Body);
    console.log(messageData.token.userId,'message')
    // Perform required operations using userId
    console.log(`Received login message for user with ID: ${messageData.token.userId}`);
    const decoded = jwt.verify(messageData.token.token,'XXXYTHSRATAV');

    // Acknowledge message deletion
    const sqs = new AWS.SQS();
    const deleteParams = {
      QueueUrl: 'https://sqs.ap-south-1.amazonaws.com/992382671249/fsa',
      ReceiptHandle: message.ReceiptHandle,
    };
    await sqs.deleteMessage(deleteParams).promise();
  } catch (error) {
    console.error('Error processing login message:', error);
    throw error;
  }
};
let isPolling = false;
app.use('/api',async (req,res,next)=>{
  if(!isPolling){
    isPolling = true;
    pollMessages()
    .catch(error=>console.error('Error polling messages:', error))
    .finally(()=>{
      isPolling = false;
    });
  }
  next();
});
  
// pollMessages();

app.get('/',(req,res)=>{
  res.status(200).json({
    message:"server responding"
  })
})

// Sync database models with MySQL
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


 
const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app)

module.exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);

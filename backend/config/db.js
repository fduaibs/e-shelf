require('dotenv').config();
const mongoose = require('mongoose');

module.exports = { 
  connect() {
    mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    mongoose.connection.on('error', () => console.error('connection error:'));
    mongoose.connection.once('open', () => console.log('database connected'));  
  }
}
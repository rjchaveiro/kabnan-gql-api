import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://graphql:yybN1qTCg7Jxvr4t@demo-database-r6uts.mongodb.net/graphql?retryWrites=true',
      { useNewUrlParser: true }
    );
    console.log('connected to db');
  } catch (err) {
    console.error(error);
  }
};

export default connectToDb;

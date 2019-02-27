import mongoose from 'mongoose';

const connectToDb = async () => {
  const { MDB_USER, MDB_PASSWORD } = process.env;
  try {
    await mongoose.connect(
      `mongodb+srv://${MDB_USER}:${MDB_PASSWORD}@demo-database-r6uts.mongodb.net/graphql?retryWrites=true`,
      { useNewUrlParser: true }
    );
    console.log('connected to db');
  } catch (err) {
    console.error(error);
  }
};

export default connectToDb;

import mongoose from "mongoose";

const conn = {
  isConnected: false,
};

async function connectDB() {
  if (conn.isConnected) return;
  try {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: "catacpol",
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    });

    console.log(db.connection.db.databaseName);
    conn.isConnected = true;
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;

import mongoose from "mongoose";
import EventEmitter from "events";

class ConnectionState extends EventEmitter {
  connected = false;
  connecting = false;
  error = null;
}

const connectionState = new ConnectionState();

const connect = async () => {
  connectionState.connecting = true;
  console.log("Database connecting...");

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    
    
    connectionState.connected = true;
    console.log("Database Connected!");
  } catch (error) {
    connectionState.error = error;
    console.error("Connection error:", error);
  } finally {
    connectionState.connecting = false;
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    connectionState.connected = false;
    console.log("Database is disconnected");
  } catch (error) {
    console.error("Error while disconnecting:", error);
  }
};

export { connectionState, connect, disconnect };

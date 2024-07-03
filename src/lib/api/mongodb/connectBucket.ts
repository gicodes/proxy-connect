import { MongoClient , GridFSBucket} from "mongodb";
import clientPromise from "./mongodb";

const uri = "mongodb+srv://trackride:KeUFUEa9hzHwucxs@cluster0.vhvjhma.mongodb.net/?appName=Cluster0";

export async function connectDBucket() {
    const client = (global.client = new MongoClient(uri, {}));
    const bucket = (global.bucket = new GridFSBucket(client.db(), {
      bucketName: "images",
    }));
    await client.connect();
    return { clientPromise, bucket: bucket! };
  }
  
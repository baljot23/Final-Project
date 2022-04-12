import { useAuth } from "../client/src/components/Form/AuthContext";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;
console.log({ MONGO_URI });

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const batchImport = async () => {
  const { currentUser } = useAuth();

  const data = currentUser?.uid;
  console.log(data);

  try {
    await client.connect();
    const db = client.db("Marvel");
    const result = await db.collection("data").insertMany(data);
    console.log("connected!");

    if (result.acknowledged === true) {
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};
batchImport();

import { checkMasterCertificate } from "./iot/certManager.js";
import { initDevice } from "./iot/index.js";
import express from "express";
import cors from "cors"
import {searchDataDB} from "./saveDatabase.js"
import { connectDB } from "./saveDatabase.js";

const app = express();
app.use(cors())
// downloading remote cert to connect
await checkMasterCertificate();
connectDB()
// connect to mqtt queue
await initDevice();

app.get("/record",searchDataDB)
 
app.listen(9000, () => {
    console.log('Server listening on port 9000');
});


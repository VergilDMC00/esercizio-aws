import mongoose from 'mongoose';
let dataSchema = new mongoose.Schema({
    "creatorName": String, 
    "sensor": String,
    "temperature":  Number,
    "humidity": Number,
    "timestamp":    Number
})
let sensorData = mongoose.model('recordIoT', dataSchema);

export function connectDB()
{
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Connected to database')
    })
}
export async function saveDb (data)
{
    let information = {
        "sensor":data.sensorCode,
        "temperature":data.value,
        "humidity":data.hum,
        "timestamp":data.timestamp
    }
    
    const sensorDataToSave = new sensorData({
        "creatorName":"Cardillo Giacomo",
        "sensor":data.sensorCode,
        "temperature":data.value,
        "humidity":data.hum,
        "timestamp":data.timestamp
    })
    await sensorDataToSave.save()
    console.log({information})

}

export function searchDataDB(req,res)
{
    //console.log(req.query)
    //console.log(mongoose.connection.readyState)
    sensorData.find({creatorName:"Cardillo Giacomo"},(err,data)=>{
        if(err)
        {
            console.log({err})
        }
        else
        {
            console.log("in find:",{data})
            res.send(data)
        }
    })
}
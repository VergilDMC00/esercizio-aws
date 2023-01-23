import axios from "axios";
import "./Axios.js"

export const Getrecords = async ()=>{
    try {
    const data = await axios.get('/record',{
        timeout: 1000,
        params:{
            owner:"Cardillo Giacomo"
        }
    })
    return data
    } catch (error) {
        console.log({ErrorDataLogs: error})
        return null
    }

}
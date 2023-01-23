import { useState,useEffect } from 'react';
import { LineChart } from '../component/ChartJs';
import { Getrecords } from '../api/Requests';
export const ChartPage = () => {
    const [data,setData]=useState([])
    const [label,setLabel]=useState([])
    const [temperature,setTemperature] = useState(0)
    const [humidity,setHumidity] = useState(0)
    const [dataArray,setDataArray] = useState([])
    const [alarmState,setAlarmState] = useState(false)

    useEffect(()=>{
      let lastElmIndex = dataArray.length - 1
      setTemperature( lastElmIndex >=1 ? parseFloat(dataArray[lastElmIndex].temperature).toFixed(2) : 0)
      setHumidity(lastElmIndex >=1 ? parseFloat(dataArray[lastElmIndex].humidity).toFixed(2) : 0)
      {(dataArray != []) && setLabel(labels(dataArray));setData(temperatureArray(dataArray))}
      console.log({temperature},{humidity})
    },[dataArray])

    useEffect(()=>{
      if(temperature >= 20)
      {
        setAlarmState(true)
      }
      else
      {
        setAlarmState(false)
      }
    },[temperature])

    setInterval(()=>{
        try{
            Getrecords().then((response)=>{
            console.log("response get request:",{response})
            setDataArray(response.data)
          })
        }
        catch(err)
        {
          console.log({err})
        }
      },5000)
    
      const labels = (data) => {
        console.log("data in labels:",{data})
        return data.map((elm)=>{
          let date = new Date(elm.timestamp).getHours() + ":" + new Date(elm.timestamp).getMinutes() + ":" + new Date(elm.timestamp).getSeconds()
          console.log({date})
          return date
        })
      }
    
      const temperatureArray = (data) => {
        console.log("data in temp array:",{data})
        return data.map((elm)=>{
          let temperature = parseFloat(elm.temperature).toFixed(2)
          return temperature
        })
      }
    
    return (
      <div className='container'>
        {alarmState && <p>TEMPERTAURA SUPERIORE A "20°C</p>}
        <div className='measureContainer'>
          <div>
            <p>TEMPERTAURE</p>
            <p>{temperature + "°C"}</p>
          </div>
          <div>
            <p>HUMIDITY</p>
            <p>{humidity + "%"}</p>
          </div>
        </div>
        <div className='graphicContainer'>
            {(data != [] && label != []) && <LineChart data={data} label={label} />}
        </div>
      </div>
    )
}
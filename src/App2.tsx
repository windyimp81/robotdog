import React, { useCallback, useEffect, useRef, useState } from 'react';
import useInterval from "./hooks/useInterval";
import './App.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, useTheme, styled, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import ChartHumi from './component/ChartHumi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {

  const mountedDust100 = useRef(false);
  const [sensorValueDust100, setSensorValueDust100] = useState<number[]>([]);
  const [receiveTimeDust100, setReceiveTimeDust100] = useState<string[]>([]);

  const [isStartDust100, setIsStartDust100] = useState(true);

  function toggleStartDust100(){
    setIsStartDust100(!isStartDust100);
    mountedDust100.current=isStartDust100
  }

  useEffect(()=> {
    console.log("effect works", mountedDust100.current);
    if(!mountedDust100.current) {
      mountedDust100.current = true;
    }
    else {
      const loop = setInterval(
        () => axios.get(`http://43.201.154.68:8100/Get_Value?sensor_type=DUST100`)
        .then((response) => {
          console.log("res");
          const da = response.data['data'][0];
          let sv = Number(da.sensor_value);
          let st = da.receive_time;
          setSensorValueDust100(vl => [...vl, sv]);
          setReceiveTimeDust100(rt => [...rt, st]);
        }), 2000);
      return () => {clearInterval(loop)};
    }
    
  },[isStartDust100]);

  const optionsDust100 = {
      responsive: false,
      plugins: {
          legend: {
              display: false,
              position: 'top' as const,
          },
          title: {
              display: true,
              text: 'chartDust100',
          }
      }
  };
  const dataDust100 = {
      labels: receiveTimeDust100,
      datasets: [
          {
              label: 'Dust100',
              data: sensorValueDust100,
              borderColor: 'rgb(255, 99,132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderWidth: 1,
              pointRadius: 1,
          }
      ],
  };



const mountedDust25 = useRef(false);
const [sensorValueDust25, setSensorValueDust25] = useState<number[]>([]);
const [receiveTimeDust25, setReceiveTimeDust25] = useState<string[]>([]);

const [isStartDust25, setIsStartDust25] = useState(true);

function toggleStartDust25(){
  setIsStartDust25(!isStartDust25);
  mountedDust25.current=isStartDust25
}

useEffect(()=> {
  if(!mountedDust25.current) {
    mountedDust25.current = true;
  }
  else {
    const loop = setInterval(
      () => axios.get(`http://43.201.154.68:8100/Get_Value?sensor_type=DUST25`)
      .then((response) => {
        console.log("res");
        const da = response.data['data'][0];
        let sv = Number(da.sensor_value);
        let st = da.receive_time;
        setSensorValueDust25(vl => [...vl, sv]);
        setReceiveTimeDust25(rt => [...rt, st]);
      }), 5000);
    return () => {clearInterval(loop)};
  }
  
},[isStartDust25]);

const optionsDust25 = {
    responsive: false,
    plugins: {
        legend: {
            display: false,
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'chartDust25',
        }
    }
};
const dataDust25 = {
    labels: receiveTimeDust25,
    datasets: [
        {
            label: 'Dust25',
            data: sensorValueDust25,
            borderColor: 'rgb(255, 99,132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1,
            pointRadius: 1,
        }
    ],
};


  const mountedTemp = useRef(false);
  const [sensorValueTemp, setSensorValueTemp] = useState<number[]>([]);
  const [receiveTimeTemp, setReceiveTimeTemp] = useState<string[]>([]);

  const [isStartTemp, setIsStartTemp] = useState(true);

  function toggleStartTemp(){
    setIsStartTemp(!isStartTemp);
    mountedTemp.current=isStartTemp
  }

  useEffect(()=> {
    if(!mountedTemp.current) {
      mountedTemp.current = true;
    }
    else {
      const loop = setInterval(
        () => axios.get(`http://43.201.154.68:8100/Get_Value?sensor_type=TEMP`)
        .then((response) => {
          console.log("res");
          const da = response.data['data'][0];
          let sv = Number(da.sensor_value);
          let st = da.receive_time;
          setSensorValueTemp(vl => [...vl, sv]);
          setReceiveTimeTemp(rt => [...rt, st]);
        }), 5000);
      return () => {clearInterval(loop)};
    }
    
  },[isStartTemp]);

  const optionsTemp = {
      responsive: false,
      plugins: {
          legend: {
              display: false,
              position: 'top' as const,
          },
          title: {
              display: true,
              text: 'chartTemp',
          }
      }
  };
  const dataTemp = {
      labels: receiveTimeTemp,
      datasets: [
          {
              label: 'Temp',
              data: sensorValueTemp,
              borderColor: 'rgb(255, 99,132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderWidth: 1,
              pointRadius: 1,
          }
      ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Robot Dog Data
        </p>
      </header>
      <body className="App-body">
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Button
              // sx={{ mr:0, alignContent: 'flex-end' }}
              onClick={toggleStartDust100}
            >
              자료수집 {isStartDust100? "시작" : "멈춤"}
            </Button>
            <Line options={optionsDust100} data={dataDust100} style={{position: "relative", width: "500px"}} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              // sx={{ mr:0, alignContent: 'flex-end' }}
              onClick={toggleStartDust25}
            >
              자료수집 {isStartDust25? "시작" : "멈춤"}
            </Button>
            <Line options={optionsDust25} data={dataDust25} style={{position: "relative", width: "500px"}} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              // sx={{ mr:0, alignContent: 'flex-end' }}
              onClick={toggleStartTemp}
            >
              자료수집 {isStartTemp? "시작" : "멈춤"}
            </Button>
            <Line options={optionsTemp} data={dataTemp} style={{position: "relative", width: "500px"}} />
          </Grid>
        </Grid>
        <Card
          variant="outlined"
          sx={{
          height: 460
          }}
        >
          <Box>
            <iframe title="map" src="http://3.39.211.43:8083/chmap.html" width="100%" height="460px" ></iframe>
          </Box>
        
        </Card>
        <Grid container>
          {/* <Grid item xs={12} sm={6}>
            <Line options={options} data={data} style={{position: "relative", height: "200px"}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Line options={options} data={data} style={{position: "relative", height: "200px"}}/>
          </Grid> */}
        </Grid>
      </body>
      <footer className='App-footer'>
        <p>
          Bye
        </p>
      </footer>
    </div>
  );
}

export default App;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import useInterval from "./hooks/useInterval";
import './App.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, useTheme, styled, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import ChartHumi from './component/ChartHumi';
import ChartDust100 from './component/ChartDust100';
import ChartCo from './component/ChartCo';
import ChartCo2 from './component/ChartCo2';
import ChartDust25 from './component/ChartDust25';
import ChartH2s from './component/ChartH2s';
import ChartLel from './component/ChartLel';
import ChartO2 from './component/ChartO2';
import ChartTemp from './component/ChartTemp';

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

  const sensor_type = ["DUST25", "DUST100", "HUMI", "TEMP", "LEL", "O2", "CO", "CO2", "H2S"];
  const base_url = "http://43.201.154.68:8100/Get_Value?sensor_type=";

  const [sensorValueDust25, setSensorValueDust25] = useState<number[]>([]);
  const [receiveTimeDust25, setReceiveTimeDust25] = useState<string[]>([]);

  const [sensorValueDust100, setSensorValueDust100] = useState<number[]>([]);
  const [receiveTimeDust100, setReceiveTimeDust100] = useState<string[]>([]);

  const [sensorValueHumi, setSensorValueHumi] = useState<number[]>([]);
  const [receiveTimeHumi, setReceiveTimeHumi] = useState<string[]>([]);

  const [sensorValueTemp, setSensorValueTemp] = useState<number[]>([]);
  const [receiveTimeTemp, setReceiveTimeTemp] = useState<string[]>([]);

  const [sensorValueLel, setSensorValueLel] = useState<number[]>([]);
  const [receiveTimeLel, setReceiveTimeLel] = useState<string[]>([]);

  const [sensorValueO2, setSensorValueO2] = useState<number[]>([]);
  const [receiveTimeO2, setReceiveTimeO2] = useState<string[]>([]);

  const [sensorValueCo, setSensorValueCo] = useState<number[]>([]);
  const [receiveTimeCo, setReceiveTimeCo] = useState<string[]>([]);

  const [sensorValueCo2, setSensorValueCo2] = useState<number[]>([]);
  const [receiveTimeCo2, setReceiveTimeCo2] = useState<string[]>([]);

  const [sensorValueH2s, setSensorValueH2s] = useState<number[]>([]);
  const [receiveTimeH2s, setReceiveTimeH2s] = useState<string[]>([]);


  const mounted = useRef(false);
  const [isStart, setIsStart] = useState(true);

  function toggleStart(){
    setIsStart(!isStart);
    mounted.current = isStart
  }

  useEffect(() => {
    console.log('status:', isStart);
  }, [isStart])

  useEffect(()=> {
    console.log('data: ', mounted.current);
    if(!mounted.current) {
      mounted.current = true;
    }
    else {
      const loop = setInterval(
        () => axios
        .all([axios.get(base_url+sensor_type[0]),
              axios.get(base_url+sensor_type[1]),
              axios.get(base_url+sensor_type[2]),
              axios.get(base_url+sensor_type[3]),
              axios.get(base_url+sensor_type[4]),
              axios.get(base_url+sensor_type[5]),
              axios.get(base_url+sensor_type[6]),
              axios.get(base_url+sensor_type[7]),
              axios.get(base_url+sensor_type[8]),
      ])
        .then((res) => {
          // console.log("res:", res);
          const d25 = res[0]['data']['data'][0];
          const d100 = res[1]['data']['data'][0];
          const humi = res[2]['data']['data'][0];
          const temp = res[3]['data']['data'][0];
          const lel = res[4]['data']['data'][0];
          const o2 = res[5]['data']['data'][0];
          const co = res[6]['data']['data'][0];
          const co2 = res[7]['data']['data'][0];
          const h2s = res[8]['data']['data'][0];

          setSensorValueDust25(vl => [...vl, d25.sensor_value]);
          setReceiveTimeDust25(rt => [...rt, d25.receive_time]);

          setSensorValueDust100(vl => [...vl, d100.sensor_value]);
          setReceiveTimeDust100(rt => [...rt, d100.receive_time]);

          setSensorValueHumi(vl => [...vl, humi.sensor_value]);
          setReceiveTimeHumi(rt => [...rt, humi.receive_time]);

          setSensorValueTemp(vl => [...vl, temp.sensor_value]);
          setReceiveTimeTemp(rt => [...rt, temp.receive_time]);

          setSensorValueLel(vl => [...vl, lel.sensor_value]);
          setReceiveTimeLel(rt => [...rt, lel.receive_time]);

          setSensorValueO2(vl => [...vl, o2.sensor_value]);
          setReceiveTimeO2(rt => [...rt, o2.receive_time]);

          setSensorValueCo(vl => [...vl, co.sensor_value]);
          setReceiveTimeCo(rt => [...rt, co.receive_time]);

          setSensorValueCo2(vl => [...vl, co2.sensor_value]);
          setReceiveTimeCo2(rt => [...rt, co2.receive_time]);

          setSensorValueH2s(vl => [...vl, h2s.sensor_value]);
          setReceiveTimeH2s(rt => [...rt, h2s.receive_time]);
        }), 2000);
      return () => {clearInterval(loop)};
    }
    
  },[isStart]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Robot Dog Data
        </p>
      </header>
      <body className="App-body">
        <Button onClick={toggleStart}> Button </Button>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <ChartDust25 sensor_value={sensorValueDust25} receive_time={receiveTimeDust25} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartDust100 sensor_value={sensorValueDust100} receive_time={receiveTimeDust100} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartHumi sensor_value={sensorValueCo2} receive_time={receiveTimeCo2} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartTemp sensor_value={sensorValueTemp} receive_time={receiveTimeTemp} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartLel sensor_value={sensorValueLel} receive_time={receiveTimeLel} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartO2 sensor_value={sensorValueO2} receive_time={receiveTimeO2} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartCo sensor_value={sensorValueCo} receive_time={receiveTimeCo} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartCo2 sensor_value={sensorValueCo2} receive_time={receiveTimeCo2} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartH2s sensor_value={sensorValueH2s} receive_time={receiveTimeH2s} />
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

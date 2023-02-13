import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, useTheme, styled, Box, Grid, Button } from '@mui/material';
import axios from 'axios';

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

  const [data1, setData1] = useState({
    sensor_value: 0,
    receive_time: ''
  });

  useEffect(() => {
    setInterval(
      () => axios.get(`http://43.201.154.68:8100/Get_Value?sensor_type=DUST100`)
      .then((response) => {
        setData1(response.data['data'][0]);
      }), 2000
    )
  }, []);
  const [sensorValue, setSensorValue] = useState(0);
  const [receiveTime, setReceiveTime] = useState('');
  // const fetchDatas = async() => {
  //     const response = await axios.get('http://43.201.154.68:8100/Get_Value?sensor_type=DUST100');
  //     setData1(response.data['data'][0]);
  // };

  // useEffect(() => {
  //     fetchDatas();
  // }, []);

  useEffect(() => {
      let sv = Number(data1?.sensor_value);
      let st = data1.receive_time;
      setSensorValue(sv);
      setReceiveTime(st);
  }, [data1])

  const options = {
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
  const labels = [receiveTime];
  const data = {
      labels,
      datasets: [
          {
              label: 'Dust100',
              data: [sensorValue],
              borderColor: 'rgb(255, 99,132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
          <Grid item xs={12} sm={6}>
            <Button
              // onClick={SI}
            >
              Start
            </Button>
            <Line options={options} data={data} style={{position: "relative", height: "200px"}} />
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

import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Card,
  useTheme,
  styled,
  Box,
  Grid
} from '@mui/material';
import { apiRequest } from './utils/apiRequest';
import type { RespResult } from './models/responsetype';
import useRefMounted from './hooks/useRefMounted';
import { Device1 } from './models/device1';
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

interface data1 {
  device_group : string,
  device_id : string,
  device_time : string,
  id : string,
  receive_time : string,
  sensor_type : string,
  sensor_value : string,
  time_string : string
}


function App() {

  const options = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       // data: labels.map(() => Number()),
  //       data: [30, 50, 20, 60, 100,70],
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: [20, 40, 70, 30, 150, 100],
  //       borderColor: 'rgb(53, 162, 235)',
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  const [data, setData] = useState<data1>();
  const [dataLists, setDataLists] = useState<data1[]>([]);
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [activeItem, setActiveItem] = useState(0);
  const fetchDatas = async() => {
    const response = await axios.get('http://43.201.154.68:8100/Get_Value?sensor_type=DUST100');
    setData(response.data['data']);
    // setActiveItem(response.data[0]);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  useEffect(() => {
    // setDataLists(el => [...el, (sensor_type: '', sensor_value: '', time_string: '')]);
    console.log('data:', data?.sensor_value);
  }, [data])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Robot Dog Data
        </p>
      </header>
      <body className="App-body">
        <Grid container>
          {/* <Grid item xs={12} sm={6}>
            <Line options={options} data={data.map(() => Number())} style={{position: "relative", height: "200px"}}/>
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <Line options={options} data={data} style={{position: "relative", height: "200px"}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Line options={options} data={data} style={{position: "relative", height: "200px"}}/>
          </Grid> */}
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

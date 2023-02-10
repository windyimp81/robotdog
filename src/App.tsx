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
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        // data: labels.map(() => Number()),
        data: [30, 50, 20, 60, 100,70],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [20, 40, 70, 30, 150, 100],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const [dataLists1, setDataLists1] = useState<Device1[]>([]);
  const [dataList1, setDataList1] = useState<[]>([]);
  const isMountedRef = useRefMounted();

  
  const getdata1 = async () => {
    try {
      const response = await apiRequest.get<{ rsp: RespResult }>(
        `Get_Value?sensor_type=DUST100`
      );
      // console.log()
      //setDataList1(response["data"]);
      // console.log('type:', typeof response.data);
      console.log('type:', response.data.rsp);
      // const myvalue: RespResult = {code: response., message: '', data: response.data.rsp.data};
      console.log('data:', );
      // setDataList1(myvalue.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() =>{
    getdata1()
  },[])

  useEffect(() => {
    console.log(dataList1);
  }, [dataList1]);

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
            <Line options={options} data={data} style={{position: "relative", height: "200px"}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Line options={options} data={data} style={{position: "relative", height: "200px"}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Line options={options} data={data} style={{position: "relative", height: "200px"}}/>
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
          <Grid item xs={12} sm={6}>
            <Line options={options} data={data} style={{position: "relative", height: "200px"}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Line options={options} data={data} style={{position: "relative", height: "200px"}}/>
          </Grid>
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

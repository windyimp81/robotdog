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

function ChartDust100() {

    const mounted = useRef(false);
    const [data1, setData1] = useState({
        sensor_value: 0,
        receive_time: ''
    });
    const [sensorValue, setSensorValue] = useState<number[]>([]);
    const [receiveTime, setReceiveTime] = useState<string[]>([]);

    const [isStart, setIsStart] = useState(true);

    function toggleStart(){
        setIsStart(!isStart);
        mounted.current=isStart
    }

    useEffect(()=> {
        console.log("effect works", mounted.current);
        if(!mounted.current) {
        mounted.current = true;
        }
        else {
        const loop = setInterval(
            () => axios.get(`http://43.201.154.68:8100/Get_Value?sensor_type=DUST100`)
            .then((response) => {
            console.log("res");
            const da = response.data['data'][0];
            let sv = Number(da.sensor_value);
            let st = da.receive_time;
            setSensorValue(vl => [...vl, sv]);
            setReceiveTime(rt => [...rt, st]);
            }), 5000);
        return () => {clearInterval(loop)};
        }
        
    },[isStart]);

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
    const data = {
        labels: receiveTime,
        datasets: [
            {
                label: 'Dust100',
                data: sensorValue,
                borderColor: 'rgb(255, 99,132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1,
                pointRadius: 1,
            }
        ],
    };

    // return (
    //     <div className="ChartDust100">
    //     <body className="ChartDust100-body">
    //         <Grid container>
    //         <Grid item xs={12} sm={6}>
    //             <Button
    //             onClick={toggleStart}
    //             >
    //             자료수집 {isStart? "시작" : "멈춤"}
    //             </Button>
    //             <Line options={options} data={data} style={{position: "relative", height: "200px"}} />
    //         </Grid>
    //         </Grid>
    //         <Card
    //         variant="outlined"
    //         sx={{
    //         height: 460
    //         }}
    //         >
    //         <Box>
    //             <iframe title="map" src="http://3.39.211.43:8083/chmap.html" width="100%" height="460px" ></iframe>
    //         </Box>
            
    //         </Card>
    //         <Grid container>
    //         </Grid>
    //     </body>
    //     </div>
    // );
}

export default ChartDust100;
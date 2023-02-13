import { Line } from 'react-chartjs-2';

const CoChart = (props: any) => {
    var sensorValue = props.sensor_value;
    var receiveTime = props.receive_time;

    const options = {
        responsive: false,
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'CO',
            }
        }
    };
    const data = {
        labels: receiveTime,
        datasets: [
            {
                label: 'CO',
                data: sensorValue,
                borderColor: 'rgb(255, 99,132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1,
                pointRadius: 1,
            }
        ],
    };

    return <Line options={options} data={data} style={{position: "relative", height: "200px"}} />
}

export default CoChart;
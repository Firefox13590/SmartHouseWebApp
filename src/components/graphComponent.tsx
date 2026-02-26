import { Chart, Colors } from "chart.js/auto";
import { useEffect, useRef } from "react";

import type { IDataCollection, IGraphProp } from "../definitions/interfaces";
import type { ChartDataset } from "chart.js/auto";


export default function Graph(props: IGraphProp){
    const chartRef = useRef<Chart | null>(null);

    const dateFormatOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        // weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
    }
    const intlDateFormater = new Intl.DateTimeFormat(undefined, dateFormatOptions);


    useEffect(() => {
        // console.log(props);
        Chart.register(Colors);
        chartSetup(props.id, props.data);
    }, []);


    const chartSetup = (id: string, data: IDataCollection[]) => {
        // console.log(id, data);

        // Destroy previous chart if it exists to prevent memory leaks and ensure proper cleanup
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById(id) as HTMLCanvasElement;
        if (ctx) {
            const chartLabels: string[] = [];
            const chartDataset: ChartDataset[] = [];

            // Data processing to adapt to Chart.js format
            data.forEach((entry: IDataCollection/* , index: number */) => {
                // console.log("data collection entry: ", entry);
                entry.dataTimestamps.sort((a, b) => a.toMillis() - b.toMillis());

                if(chartLabels.length < 1){
                    entry.dataTimestamps.forEach(elem => {
                        // console.log(elem);
                        // console.log(elem.toDate());
                        // console.log(intlDateFormater.format(elem.toDate()));
                        chartLabels.push(intlDateFormater.format(elem.toDate()));
                    });
                }
                // console.log(chartLabels);

                chartDataset.push({
                    label: entry.dataName,
                    data: entry.dataValues,
                });
            });

            // Create a new chart instance with the updated data
            chartRef.current = new Chart(ctx, {
                type: "line",
                data: {
                    labels: chartLabels,
                    datasets: chartDataset,
                },
            });
        }

        // Cleanup function to destroy the chart instance when the component unmounts or when the chart needs to be re-rendered with new data
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }


    return(
        <div className="dc-item"
        style={{
            backgroundColor: "#333",
            border: "1px solid white",
            borderRadius: "20px",
            margin: "25px 10px",
            paddingBottom: "20px",
        }}>
            <h3>{props.graphDisplay === "condensed" ? "Data" : props.data[0].dataName.toUpperCase()}</h3>
            <div 
            style={{
                width: "300px",
                margin: "auto",
            }}>
                <canvas id={props.id}
                style={{
                    backgroundColor: "#ddd",
                }}></canvas>
            </div>
        </div>
    )
}
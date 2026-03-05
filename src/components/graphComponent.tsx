import { Chart, Colors } from "chart.js/auto";
import { useEffect, useRef } from "react";

import type { IGraphProp } from "../definitions/interfaces";
import type { ChartDataset } from "chart.js/auto";
import type { DataCollection } from "../definitions/types";


export default function Graph(props: IGraphProp) {
    // console.log(props);
    const chartRef = useRef<Chart | null>(null);
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
        weekday: undefined,
        hour: 'numeric',
        minute: 'numeric',
    }
    const intlDateFormater = new Intl.DateTimeFormat('fr-CA', dateFormatOptions);


    useEffect(() => {
        Chart.register(Colors);
        // chartSetup(props.id, props.data.map(fullData => fullData[1]));
        chartSetup(props.id, props.data);
    }, []);


    const chartSetup = (id: string, data: [string, DataCollection][]) => {
        console.log(id, data);

        // Destroy previous chart if it exists to prevent memory leaks and ensure proper cleanup
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById(id) as HTMLCanvasElement;
        if (ctx) {
            const chartLabels: string[] = [];
            const chartDataset: ChartDataset[] = [];

            // Data processing to adapt to Chart.js format
            data.forEach(([name, entry]) => {
                // console.log("data collection entry before sort: ", entry);
                // entry.dataTimestamps.sort((a, b) => a.toMillis() - b.toMillis());
                entry.dataTimestamps.sort((a, b) => {
                    const output = a.toMillis() - b.toMillis();
                    entry.dataValues.sort(() => output);
                    return output
                });
                // console.log("data collection entry after sort: ", entry);

                if (chartLabels.length < 1) {
                    entry.dataTimestamps.forEach(elem => {
                        // console.log(elem);
                        // console.log(elem.toDate());
                        // console.log(intlDateFormater.format(elem.toDate()));
                        chartLabels.push(intlDateFormater.format(elem.toDate()));
                    });
                }
                // console.log(chartLabels);

                chartDataset.push({
                    label: name,
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


    return (
        <div className="dc-item"
            style={{
                backgroundColor: "#333",
                border: "1px solid white",
                borderRadius: "20px",
                margin: "25px 10px",
                paddingBottom: "20px",
            }}>
            <h3>{props.graphDisplay === "condensed" ? "Data" : props.data[0][0].toUpperCase()}</h3>
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
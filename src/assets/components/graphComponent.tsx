import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

import type { DataCollection } from "../../pages/Details";


export default function Graph(props: any){
    // const data: {object: any, keys: (string)[], values: (number)[]} = {
    //     object: null,
    //     keys: [""],
    //     values: [0],
    // };
    const data = props.object as (DataCollection)[];
    // const 
    // dataKeys = Object.keys(data.dataValues) ?? [],
    // dataValues = Object.values(data.dataValues).map(v => Number(v)) ?? [];
    const chartRef = useRef<Chart | null>(null);


    useEffect(() => {
        chartSetup(props.id, data);
    }, [props.id, data]);


    const chartSetup = (id: string, data: (DataCollection)[]) => {
        // console.log(dataKeys, dataValues);

        // Détruire l'ancien graphique s'il existe
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById(id) as HTMLCanvasElement;
        if (ctx) {
            const values: any[] = [];
            data.forEach((data: DataCollection, index: number) => {
                values.push({
                    label: data.dataName,
                    backgroundColor: props.color[index],
                    borderColor: `${props.color[index]}1`,
                    data: data.dataValues,
                });
            });

            chartRef.current = new Chart(ctx, {
                type: "line",
                data: {
                    labels: Object.keys(data[0].dataValues),
                    // datasets: [{
                    //     label: data.dataName,
                    //     backgroundColor: props.color,
                    //     borderColor: `${props.color}1`,
                    //     data: dataValues,
                    // }],
                    datasets: values,
                },
            });
        }

        // Nettoyage lors du démontage du composant
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }


    return(
        <div
        style={{
            backgroundColor: props.display === "condensed" ? "#333" : props.color,
            border:props.display === "condensed" ? "1px solid white" : "none" ,
            borderRadius: "20px",
            margin: "25px 10px",
            padding: "10px",
        }}>
            <h3>{props.display === "condensed" ? "Data" : data[0].dataName.toUpperCase()}</h3>
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
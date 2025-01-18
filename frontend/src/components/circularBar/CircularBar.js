import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./CircularBar.scss"
const CircularBar = ({ percentage, color, title }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((value) => {
                const newValue = value + 1;
                return newValue > percentage ? percentage : newValue;
            });
        }, 12);

        return () => clearInterval(interval);
    }, [percentage]);

    return (
        <div style={{width: "7rem",
            display: "flex",
            background: "aliceblue",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: `5px 4px 12px -4px ${color}`

             }}>
            <CircularProgressbar
                value={value}
                text={`${value}`}
                strokeWidth={8}
                styles={{
                    root: { width: '100%' },
                    path: { stroke: `${color} `, strokeLinecap: 'round' },
                    trail: { stroke: '#d6d6d6' },
                    text: { fill: '#4d4d4d', fontSize: '20px', fontWeight: 'bold' },
                }}
            />
            <p style={{ fontSize: "1rem", fontWeight: "500", marginTop: "10px" }}>{title}</p>
        </div>
    );
};

export default CircularBar;

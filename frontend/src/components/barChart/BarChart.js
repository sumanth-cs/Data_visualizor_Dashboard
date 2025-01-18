import React, { useEffect, useState } from 'react'
import "./BarChart.scss"

import { ResponsiveBar } from '@nivo/bar'
import axios from "axios";

const MyResponsiveBar = ({ data, keys }) => (
    <ResponsiveBar
        data={data}
        keys={keys}
        indexBy="name"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.15}
        groupMode="grouped"
        valueScale={{ type: 'symlog' }}
        indexScale={{ type: 'band', round: false }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: ''
                },
                id: 'dots'
            },
            {
                match: {
                    id: ''
                },
                id: 'lines'
            }
        ]}
        borderRadius={1}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '1'
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'variables',
            legendPosition: 'middle',
            legendOffset: 42
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'values',
            legendPosition: 'middle',
            legendOffset: -50
        }}
        enableGridX={true}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.8
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 60,
                translateY: -151,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        motionConfig="slow"
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
    />
)

const BarChart = ({ filtername }) => {
    const [legendData, setLegendData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [resultLegendData, setResultLegendData] = useState([]);
  
    // fetchLegendData gives keys for barGraph. {["energy","environment","water",...]}
    useEffect(() => {
      const fetchLegendData = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/api/v1/getdataforfilter/?filtername=${filtername}`)
          setLegendData(res.data)
        } catch (error) {
          console.error("An error occurred while fetching legend data:", error);
        }
      };
      fetchLegendData();
    }, [filtername])
  
    // fetchedDataForGraph returns value for intensity, livelihood, relevence
    // [ [10,19,22], [12,324,2143], ... ]
    useEffect(() => {
      const getDataForGraph = async () => {
        const resultArray = Object.values(legendData.result || {});
        setResultLegendData(resultArray);
  
        const promises = resultArray.map((item) => {
          return axios.get(`http://localhost:8080/api/v1/getdataforgraph?${filtername}=${item}`);
        });
  
        try {
          const response = await Promise.all(promises);
          const fetched = response.map(response => response.data);
  
          let newData = [];
  
          for (let i = 0; i < 3; i++) {
            const item = {};
            item["name"] = i === 0 ? "intensity" : i === 1 ? "livelihood" : "relevance";
  
            if (fetched && fetched.length > 0 && fetched[0].length > i) {
              for (let j = 0; j < resultArray.length; j++) {
                item[resultArray[j]] = fetched[j][i];
              }
            }
            else {
            //   console.warn(`No data found for column ${i}`);
            }
            newData.push(item);
          }
  
          if (newData.length > 0) {
            setBarData(newData);
          } else {
            console.warn("No data found for bar chart");
          }
        } catch (error) {
          console.error("An error occurred while fetching graph data:", error);
        }
      };
  
      getDataForGraph();
    }, [filtername, legendData])
  
    return (
      <div className="barchart">
        {barData.length > 0 && <MyResponsiveBar data={barData} keys={resultLegendData} />}
      </div>
    );
  }
  
  export default BarChart;
import {ResponsiveBar} from '@nivo/bar';
import Typography from '@mui/material/Typography';
import React from 'react';


const ResponsiveBarGraph = ({title, data, bottomLegend, leftLegend, indexBy, keys, groupMode = 'stacked'}) => {
    return (
        <>
            <Typography align={'center'} style={{fontSize: 20, fontWeight: 700, fontFamily: 'Lato'}}>{title}</Typography>
            <ResponsiveBar
                data={data}
                keys={keys}
                indexBy={indexBy}
                margin={{top: 50, right: 130, bottom: 70, left: 60}}
                padding={0.5}
                valueScale={{type: 'linear'}}
                indexScale={{type: 'band', round: true}}
                colors={{scheme: 'category10'}}
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
                    legend: bottomLegend,
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: leftLegend,
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                groupMode={groupMode}
                enableGridY={false}
                labelSkipWidth={3}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            '2'
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 55,
                        itemsSpacing: 55,
                        itemWidth: 100,
                        itemHeight: 0,
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
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={function (e) {
                    return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue;
                }}
            />
        </>);
};
export default ResponsiveBarGraph;

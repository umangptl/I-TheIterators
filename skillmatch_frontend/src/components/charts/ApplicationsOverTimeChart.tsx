import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Container, Paper } from "@mui/material";
export default function ApplicationsOverTimeChart() {
    const data = [
        {
            id: "apps",
            color: "hsl(41, 70%, 50%)",
            data: [
                {
                    x: "Aug 20",
                    y: 2,
                },
                {
                    x: "Aug 30",
                    y: 3,
                },
                {
                    x: "Sept 2",
                    y: 1,
                },
                {
                    x: "Sept 30",
                    y: 3,
                },
                {
                    x: "Oct 1",
                    y: 6,
                },
                {
                    x: "Oct 30",
                    y: 3,
                },
            ],
        },
    ];
    return (
        <Paper elevation={3} style={{ padding: "1em" }}>
            <h3 style={{ marginTop: 0 }}>Applications Over Time</h3>
            <div style={{ height: 300 }}>
                <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: 0,
                        max: "auto",
                        stacked: true,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="natural"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Date",
                        legendOffset: 30,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        tickValues: 5,
                        legend: "Applications Recieved",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    colors={["#30343F", "#E4D9FF"]}
                    pointSize={8}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    enableArea={true}
                    areaOpacity={0.2}
                    enableCrosshair={false}
                    useMesh={true}
                    legends={[]}
                />
            </div>
        </Paper>
    );
}

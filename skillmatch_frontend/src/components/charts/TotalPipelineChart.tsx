import React from "react";
import { ResponsivePie } from "@nivo/pie";

export default function TotalPipelineChart() {
    const data = [
        {
            id: "ApplicationsRecieved",
            label: "Applications Recieved",
            value: 3,
            color: "hsl(81, 70%, 50%)",
        },
        {
            id: "ApplicantsInterviewing",
            label: "Interviewing",
            value: 2,
            color: "hsl(154, 70%, 50%)",
        },
        {
            id: "OffersSent",
            label: "Offers Sent",
            value: 2,
            color: "hsl(140, 70%, 50%)",
        },
    ];
    return (
        <ResponsivePie
            data={data}
            margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            startAngle={-120}
            activeOuterRadiusOffset={8}
            colors={["#AAA", "#FAFAFF", "#E4D9FF"]}
            borderWidth={1}
            borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
            }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            legends={[]}
            enableArcLinkLabels={false}
        />
    );
}

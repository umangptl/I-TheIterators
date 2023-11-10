import React from "react";
import { ResponsivePie } from "@nivo/pie";
export default function RecruitSourcesChart() {
    const data = [
        {
            id: "Referral",
            label: "Referral",
            value: 2,
            color: "hsl(301, 70%, 50%)",
        },
        {
            id: "RecruiterContact",
            label: "RecruiterContact",
            value: 2,
            color: "hsl(25, 70%, 50%)",
        },
        {
            id: "CareerPage",
            label: "CareerPage",
            value: 3,
            color: "hsl(201, 70%, 50%)",
        },
    ];
    return (
        <ResponsivePie
            data={data}
            margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "purpleRed_green" }}
            borderWidth={1}
            borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
            }}
            enableArcLinkLabels={false}
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
        />
    );
}

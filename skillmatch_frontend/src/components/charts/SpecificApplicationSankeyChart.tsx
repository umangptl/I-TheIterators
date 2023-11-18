import { ResponsiveSankey } from "@nivo/sankey";
import useApplicationsByJob from "../../hooks/useApplicationsByJob";

type jobID = {
    jobID: string;
};

const SpecificApplicationSankeyChart = (props: jobID) => {
    const { applications, setApplications, error } = useApplicationsByJob(
        props.jobID
    );

    let rejectedCount = 0;
    let interviewingCount = 0;
    let shortListedCount = 0;
    let offersSentCount = 0;

    if (applications) {
        rejectedCount = applications.filter(
            (application) => application.status == "REJECTED"
        ).length;
        interviewingCount = applications.filter(
            (application) => application.status == "INTERVIEWING"
        ).length;
        shortListedCount = applications.filter(
            (application) => application.status == "SHORTLISTED"
        ).length;
        offersSentCount = applications.filter(
            (application) => application.status == "SELECTED"
        ).length;
    }

    const data = {
        nodes: [
            {
                id: "Applications",
                nodeColor: "hsl(208, 70%, 50%)",
            },
            {
                id: "Rejected",
                nodeColor: "hsl(152, 70%, 50%)",
            },
            {
                id: "Interviewing",
                nodeColor: "hsl(199, 70%, 50%)",
            },
            {
                id: "Shortlisted",
                nodeColor: "hsl(255, 70%, 50%)",
            },
            {
                id: "Offer Sent",
                nodeColor: "hsl(48, 70%, 50%)",
            },
        ],
        links: [
            {
                source: "Applications",
                target: "Rejected",
                value: rejectedCount,
            },
            {
                source: "Applications",
                target: "Interviewing",
                value: interviewingCount,
            },
            {
                source: "Applications",
                target: "Shortlisted",
                value: shortListedCount,
            },
            {
                source: "Applications",
                target: "Offer Sent",
                value: offersSentCount,
            },
        ],
    };

    return (
        <ResponsiveSankey
            data={data}
            margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
            sort="input"
            align="justify"
            colors={["#1f76b4", "#d62727", "#ff7e0e", "#9f97b2", "#3ec755"]}
            nodeOpacity={1}
            nodeHoverOthersOpacity={0.35}
            nodeThickness={18}
            nodeSpacing={24}
            nodeBorderWidth={0}
            nodeBorderColor={{
                from: "color",
                modifiers: [["darker", 0.8]],
            }}
            nodeBorderRadius={3}
            linkOpacity={0.5}
            linkHoverOthersOpacity={0.1}
            linkContract={3}
            enableLinkGradient={true}
            labelPosition="outside"
            labelOrientation="vertical"
            labelPadding={16}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 1]],
            }}
        />
    );
};

export default SpecificApplicationSankeyChart;

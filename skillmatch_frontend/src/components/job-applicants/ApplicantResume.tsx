import { useEffect, useState } from "react";

interface Props {
    base64: any;
}

const ApplicantResume = ({ base64 }: Props) => {
    const [pdfUrl, setPdfUrl] = useState("");

    useEffect(() => {
        // Create a URL from the Blob
        const url = `data:application/pdf;base64,${atob(base64)}`;
        setPdfUrl(url);

        // Clean up the URL when the component is unmounted
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [base64]);

    return (
        <div>
            {pdfUrl && <iframe src={pdfUrl} width="100%" height="1000em" />}
        </div>
    );
};

export default ApplicantResume;

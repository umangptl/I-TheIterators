import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Alan
const Dashboard: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) navigate('/login');
      }, []);
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Graph here</p>
        </div>
    );
}
export default Dashboard;
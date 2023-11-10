import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../hooks/useLoginContext";
// Alan
const Dashboard = () => {
  const { isLogin, setIsLogin } = useLoginContext();
  const hero = {
    name: "Batman",
    realName: "Bruce Wayne",
  };
  const { realName } = hero;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin]);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Graph here</p>
    </div>
  );
};
export default Dashboard;

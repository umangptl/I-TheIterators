import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import { postLoginToken } from "../api/postLoginToken";
import { useLoginContext } from "../hooks/useLoginContext";
import { Grid } from "@mui/material";
import leafImage from "../imgs/plant.jpg";

export const Login = () => {
    const navigate = useNavigate();
    const { isLogin, setIsLogin } = useLoginContext();

    async function onGoogleSignIn(res: any) {
        const { credential } = res;
        const result = await postLoginToken(credential);
        setIsLogin(result);
    }

    useEffect(() => {
        if (!isLogin) return;
        navigate("/");
    }, [isLogin, navigate]);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <img
                        src={leafImage}
                        alt="Leaf image"
                        style={{
                            width: "100%",
                            maxHeight: "100vh",
                            overflow: "hidden",
                            objectFit: "cover",
                        }}
                    />
                </Grid>
                <Grid item xs={5}>
                    <div style={{ marginLeft: "2em", marginTop: "25%" }}>
                        <h1 style={{ fontWeight: 300 }}>
                            SkillMatch Recruiting
                        </h1>
                        <GoogleLogin
                            onGoogleSignIn={onGoogleSignIn}
                            text="Login"
                        />
                    </div>
                </Grid>
            </Grid>
        </>
    );
};
export default Login;

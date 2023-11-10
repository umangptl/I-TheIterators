import JobList from "./all-jobs/JobList";
import NavBar from "./common/NavBar";

const AllJobs = () => {
  // const { isLogin, setIsLogin } = useLoginContext();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLogin) navigate("/login");
  // }, [isLogin, navigate]);

  return (
    <>
      <NavBar />
      <JobList />
    </>
  );
};

export default AllJobs;

import BackgroundEffects from "../components/BackgroundEffects";
import LoginCard from "../components/LoginCard";

function Login() {
  return (
    <div className="login-page">
      <BackgroundEffects />

      <div className="login-wrapper">
        <LoginCard />
      </div>
    </div>
  );
}

export default Login;
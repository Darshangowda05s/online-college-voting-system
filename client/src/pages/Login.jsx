import BackgroundEffects from "../components/BackgroundEffects";
import LoginCard from "../components/LoginCard";

function Login() {
  return (
    <div className="relative min-h-screen bg-[#0a0908] overflow-hidden flex items-center justify-center px-4">
      <BackgroundEffects />

      <div className="relative z-10 w-full flex justify-center">
        <LoginCard />
      </div>
    </div>
  );
}

export default Login;
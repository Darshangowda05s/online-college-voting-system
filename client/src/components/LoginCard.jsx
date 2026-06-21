import { Fingerprint, EyeOff, Stamp } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../services/api";

function LoginCard() {
  const handleSuccess = async (credentialResponse) => {
    try {
      await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-card">
      <div className="login-card-topbar" />

      <div className="login-header">
        <div className="login-logo">
          <Stamp size={24} />
        </div>

        <h1 className="login-title">
          CIT Election Portal
        </h1>

        <p className="login-subtitle">
          Cambridge Institute of Technology
        </p>
      </div>

      <div className="google-login-wrap">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Login Failed")}
          theme="filled_black"
          shape="pill"
          width="280"
        />
      </div>

      <p className="login-note">
        Only verified college accounts can sign in
      </p>

      <div className="login-features">
        <div className="feature-row">
          <Fingerprint size={15} />
          <span>
            Your identity is verified once, at sign-in
          </span>
        </div>

        <div className="feature-row">
          <EyeOff size={15} />
          <span>
            Your vote stays anonymous, always
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
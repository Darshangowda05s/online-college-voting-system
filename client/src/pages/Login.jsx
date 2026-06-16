import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
    const handleSuccess = async (credentialResponse) => {
        try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/google",
      {
        credential: credentialResponse.credential
      }
      ,{
    withCredentials: true,
  }
    );

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
    };

    const handleError = () => {
        console.log("LOGIN FAILED");
    };

  return (
    <div>
      <h1>College Election</h1>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}

export default Login;
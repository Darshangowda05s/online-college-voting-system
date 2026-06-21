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
    <div className="relative w-full max-w-sm rounded-2xl border border-[#3a352a] bg-[#1c1a14] p-9 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-600" />

      <div className="flex flex-col items-center text-center">
        <div className="w-[52px] h-[52px] rounded-full border border-amber-600 flex items-center justify-center mb-5">
          <Stamp className="text-amber-600" size={24} />
        </div>

        <h1 className="font-serif text-2xl text-[#f0ebe0]">
          CIT Election Portal
        </h1>

        <p className="text-xs tracking-wider text-[#8a8275] mt-2 uppercase">
          Cambridge Institute of Technology
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Login Failed")}
          theme="filled_black"
          shape="pill"
          width="280"
        />
      </div>

      <p className="text-center text-xs text-[#6b6457] mt-4">
        Only verified college accounts can sign in
      </p>

      <div className="mt-7 pt-5 border-t border-[#3a352a] space-y-3">
        <div className="flex items-start gap-2.5">
          <Fingerprint
            size={15}
            className="text-amber-600 mt-0.5 shrink-0"
          />
          <span className="text-xs text-[#a39a8a] leading-relaxed">
            Your identity is verified once, at sign-in
          </span>
        </div>

        <div className="flex items-start gap-2.5">
          <EyeOff
            size={15}
            className="text-amber-600 mt-0.5 shrink-0"
          />
          <span className="text-xs text-[#a39a8a] leading-relaxed">
            Your vote stays anonymous, always
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
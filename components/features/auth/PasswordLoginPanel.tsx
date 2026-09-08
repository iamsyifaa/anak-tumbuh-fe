"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { clearAuthMessage, loginWithPassword } from "@/redux/features/auth/authSlice";
import { getDashboardPathByRole } from "@/lib/utils/roleRedirect";
import TextField from "@/components/ui/Input/TextField";
import PasswordField from "@/components/ui/Input/PasswordField";

function PasswordLoginPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(clearAuthMessage());

    const formData = new FormData();
    formData.append("username", username.trim());
    formData.append("password", password);

    const result = await dispatch(loginWithPassword({ formData }));

    if (loginWithPassword.fulfilled.match(result) && result.payload.code === 200) {
      localStorage.setItem("access_token", result.payload.access_token);
      router.push(getDashboardPathByRole(result.payload.data.role));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <TextField
        id="username"
        name="username"
        label="Username"
        placeholder="Masukkan username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
          if (error) dispatch(clearAuthMessage());
        }}
      />

      <PasswordField
        id="password"
        name="password"
        label="Password"
        placeholder="Masukkan password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
          if (error) dispatch(clearAuthMessage());
        }}
      />

      <button
        type="submit"
        disabled={loading || !username.trim() || !password}
        className="group w-full rounded-2xl border-b-4 border-[#232852] bg-[#3A72E3] py-3.5 text-sm font-black text-white shadow-lg shadow-[#3A72E3]/40 transition-all hover:scale-[1.02] hover:bg-[#3268D5] active:scale-95 active:translate-y-1 active:border-b-0 active:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:py-4 sm:text-base"
      >
        <span className="inline-flex items-center justify-center gap-2">
          <span>{loading ? "Memverifikasi..." : "Masuk ke Dashboard"}</span>
          {!loading && (
            <Sparkles
              className="h-4 w-4 transition-transform group-hover:rotate-12"
              aria-hidden="true"
            />
          )}
        </span>
      </button>
    </form>
  );
}

export default PasswordLoginPanel;

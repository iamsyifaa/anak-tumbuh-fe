"use client";

import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineSparkles } from "react-icons/hi2";
import { AppDispatch, RootState } from "@/redux/store";
import { clearAuthMessage, loginWithPassword } from "@/redux/features/auth/authSlice";
import { useRedirectAfterLogin } from "@/hook/useRedirectAfterLogin";
import TextField from "@/components/ui/Input/TextField";
import PasswordField from "@/components/ui/Input/PasswordField";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

// One of the 2 student login methods (see StudentLoginTabs). Content-only —
// the shared card, header, and tab switcher live in StudentLoginTabs.
function StudentPasswordLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirectAfterLogin = useRedirectAfterLogin();
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
      redirectAfterLogin(result.payload.access_token, result.payload.data.role);
    }
  };

  return (
    <>
      {error && <ErrorAlert message={error} onClose={() => dispatch(clearAuthMessage())} />}

      <form onSubmit={handleSubmit} className="mt-2.5 space-y-2.5 sm:mt-4 sm:space-y-4">
        <TextField
          id="student-username"
          name="username"
          label="Username"
          placeholder="Masukkan username"
          autoComplete="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            if (error) dispatch(clearAuthMessage());
          }}
        />

        <PasswordField
          id="student-password"
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
          className="group w-full rounded-xl border-b-4 border-[#232852] bg-[#3A72E3] py-2.5 text-[11px] font-black text-white shadow-lg shadow-[#3A72E3]/40 transition-all hover:scale-[1.02] hover:bg-[#3268D5] active:scale-95 active:translate-y-1 active:border-b-0 active:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:rounded-2xl sm:py-4 sm:text-base"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <span>{loading ? "Memverifikasi..." : "Masuk ke Dashboard"}</span>
            {!loading && (
              <HiOutlineSparkles
                className="h-4 w-4 transition-transform group-hover:rotate-12"
                aria-hidden="true"
              />
            )}
          </span>
        </button>
      </form>
    </>
  );
}

export default StudentPasswordLoginForm;

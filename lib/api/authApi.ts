import { envConfig } from "@/lib/config/envConfig";
import { AuthApiResponse } from "@/lib/types/authType";

const mockUsers: Record<string, AuthApiResponse["data"]> = {
  "student-qr-jaehyun": { id: "student-001", name: "Jaehyun", username: "jaehyun", role: "student", classGroupId: "B1", schoolId: "school-001", avatarUrl: "/assets/student/boy-avatar.png" },
  "student-qr-syifa": { id: "student-002", name: "Syifa", username: "syifa", role: "student", classGroupId: "V-B", schoolId: "school-001", avatarUrl: "/assets/student/girl-avatar.png" },
  "student-qr-ahmad": { id: "student-003", name: "Ahmad R.", username: "ahmad", role: "student", classGroupId: "V-B", schoolId: "school-001", avatarUrl: "/assets/student/boy-avatar.png" },
};

export const loginWithPasswordApi = async (formData: FormData): Promise<AuthApiResponse> => {
  if (envConfig.useMockApi) {
    const username = String(formData.get("username") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const user = Object.values(mockUsers).find((item) => item.username === username);
    if (!user || password !== "demo123") return { code: 401, status: "error", message: "Username atau password demo salah. Gunakan password demo123.", data: {} as AuthApiResponse["data"], access_token: "" };
    return { code: 200, status: "success", message: "Login berhasil.", data: user, access_token: `mock-access-${user.id}` };
  }

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/auth/login`, { method: "POST", headers: { Accept: "application/json" }, body: formData });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.message ?? "Login gagal.");
  return result;
};

export const loginWithQrApi = async (qrToken: string): Promise<AuthApiResponse> => {
  if (envConfig.useMockApi) {
    const user = mockUsers[qrToken.trim()];
    if (!user) return { code: 400, status: "error", message: "Kode QR tidak valid atau sudah tidak aktif.", data: {} as AuthApiResponse["data"], access_token: "" };
    return { code: 200, status: "success", message: "Login QR berhasil.", data: user, access_token: `mock-access-${user.id}` };
  }

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/auth/login-qr`, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ qr_token: qrToken }) });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.message ?? "QR login gagal.");
  return result;
};

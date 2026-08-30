import { envConfig } from "@/lib/config/envConfig";
import { AuthApiResponse } from "@/lib/types/authType";

// Login untuk Super Admin, Headmaster, dan Teacher menggunakan
// Username/Email + Password (diamankan Laravel Sanctum di backend).
export const loginWithPasswordApi = async (
  formData: FormData
): Promise<AuthApiResponse> => {
  const response = await fetch(`${envConfig.apiBaseUrl}/v1/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });
  const result = await response.json();
  return result;
};

// Login untuk Student menggunakan QR Code (tanpa password).
export const loginWithQrApi = async (
  qrToken: string
): Promise<AuthApiResponse> => {
  const response = await fetch(`${envConfig.apiBaseUrl}/v1/auth/login-qr`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ qr_token: qrToken }),
  });
  const result = await response.json();
  return result;
};

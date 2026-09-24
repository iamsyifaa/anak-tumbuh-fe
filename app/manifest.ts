import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "anaktumbuh.id - Dashboard Siswa",
    short_name: "anaktumbuh.id",
    description: "Dashboard siswa untuk mencatat 7 Kebiasaan Anak Indonesia Hebat.",
    start_url: "/dashboard/student",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#EEF3F8",
    theme_color: "#17204E",
    lang: "id-ID",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

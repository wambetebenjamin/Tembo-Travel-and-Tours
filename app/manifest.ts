import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tembo Travel and Tours",
    short_name: "Tembo Travel",
    description: "East African safaris and holidays designed in Nairobi.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf9ff",
    theme_color: "#014b85",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

import { mods } from "@/lib/mods";
import HomePageClient from "./page_client";

export default function HomePage() {
  return <HomePageClient mods={[...mods.values()]} />;
}

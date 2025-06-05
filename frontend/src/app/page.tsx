import BannerSlider from "@/features/Banner";
import ClientCategories from "@/features/Categories/ui/ClientCategories";
import PopularCategories from "@/features/PopularCategories/ui";

export default function Home() {
  return (
    <div>
      <BannerSlider />
      <ClientCategories />
      <PopularCategories />
    </div>
  );
}

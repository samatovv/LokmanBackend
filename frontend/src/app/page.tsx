import BannerSlider from "@/features/Banner";
import ClientCategories from "@/features/Categories/ui/ClientCategories";
import PopularCategories from "@/features/PopularCategories/ui";

export const metadata = {
  title: 'Каталог медицинского оборудования | SigmaMed',
  description: 'Широкий выбор медицинского оборудования: тонометры, ингаляторы, стерилизаторы и др.',
  keywords: 'медицинское оборудование, купить тонометр, стерилизаторы, ингаляторы, SigmaMed',
};


export default function Home() {
  return (
    <div>
      <BannerSlider />
      <ClientCategories />
      <PopularCategories />
    </div>
  );
}

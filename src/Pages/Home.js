import Categories from "../Components/Categories/Categories";
import DevInfo from "../Components/Developer/DevInfo";
import Hero from "../Components/Hero/Hero";
import Services from "../Components/Services/Services";
import SpecialDishes from "../Components/SpecialDishes/SpecialDishes";
import SuccessStory from "../Components/Success/SuccessStory";
import Testimonials from "../Components/Testimonials/Testimonials";

export default function Home() {
  return (
    <div className=" min-h-screen ">
      <Hero></Hero>
      <Categories/>
      <SpecialDishes />
      <Testimonials />
      <Services/>
      <SuccessStory/>
      <DevInfo></DevInfo>
    </div>
  );
}

import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  const accessories = products.filter(
    (item) => item.category === "accessories"
  );
  const games = products.filter((item) => item.category === "games");
  useWindowScrollToTop();
  return (
    <>
      <SliderHome />
      <Wrapper />
      <Section
        title="Top Up"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      />
      <Section title="Accessories" bgColor="white" productItems={accessories} />
      <Section title="Games" bgColor="#f6f9fc" productItems={games} />
    </>
  );
};

export default Home;

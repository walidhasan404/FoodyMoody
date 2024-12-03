import { Helmet } from "react-helmet-async"
import Banner from "../Banner/Banner";
import Features from "../Features/Features";
import TopDeliveryMan from "../TopDeliveryMan/TopDeliveryMan";
import FoodsSection from "../FoodsSection/FoodsSection";

function Home() {
  return (
    <div>
      <Helmet>
        <title>FoodyMoody | Home</title>
      </Helmet>
      <Banner></Banner>
      <FoodsSection/>
      <Features></Features>
      <TopDeliveryMan></TopDeliveryMan>
    </div>
  );
}
export default Home
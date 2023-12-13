import Image from "next/image";
import Header from "./components/Header/Header";
import MainCarousel from "./components/Carousels/MainCarousel";
import BottomCarousel from "./components/Carousels/BottomCarousel";
export default function Home() {
  return (
    <>
      <Header />

      <MainCarousel />
      <BottomCarousel />
    </>
  );
}

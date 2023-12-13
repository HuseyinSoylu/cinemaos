// import React from "react";

// type Props = {};

// function page({}: Props) {
//   return <div>page</div>;
// }

// export default page;

import React from "react";
import MainCarousel from "../components/Carousels/MainCarousel.jsx";
import BottomCarousel from "@/app/components/Carousels/BottomCarousel.jsx";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer.tsx/index.js";

const Home = ({ user }) => {
  const userName = user ? user.name : null;

  return (
    <>
      <Header user={userName} />
      <MainCarousel />
      <BottomCarousel />
      <Footer />
    </>
  );
};

// Simulating user data retrieval, replace this with your actual data fetching logic
Home.getInitialProps = async () => {
  // Fetch user data using your preferred method
  // For example:
  // const userMail = await fetchUser();
  // const user = userMail ? JSON.parse(userMail) : null;

  // Simulating user data with a timeout
  const user = { name: "Huseyin Soylu" }; // Replace this with your user object

  return { user };
};

export default Home;

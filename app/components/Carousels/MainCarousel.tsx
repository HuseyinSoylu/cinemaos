"use client";

// import { useState } from "react";
// import Image from "next/image";
// import zamansizlar from "@/public/assets/zamansizlar.jpeg";
// import random from "@/public/assets/random.jpg";
// import third from "@/public/assets/third.jpeg";
// import { Carousel } from "react-bootstrap";
// import "./Carousel.css";

// const MainCarousel = () => {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <div>
//       <Carousel activeIndex={index} onSelect={handleSelect} style={{
//           "max-width": "100vw",
//           "width": "100%"
//       }}>
//         <Carousel.Item>
//           <Image src={third} alt="First slide" width={800} height={400} />
//         </Carousel.Item>
//         <Carousel.Item>
//           <Image
//             src={zamansizlar}
//             alt="Second slide"
//             width={800}
//             height={400}
//           />
//         </Carousel.Item>
//         <Carousel.Item>
//           <Image src={random} alt="Third slide" width={800} height={400} />
//         </Carousel.Item>
//       </Carousel>
//     </div>
//   );
// };

// export default MainCarousel;

import { useState } from "react";
import Image from "next/image";
import zamansizlar from "@/public/assets/zamansizlar.jpeg";
import random from "@/public/assets/random.jpg";
import third from "@/public/assets/third.jpeg";
import { Carousel } from "react-bootstrap";
import classes from "./Carousel.module.css"; // CSS dosyanızın yolu, uygun şekilde güncelleyin

const MainCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="bg-danger">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}

        // className={styles.sliderContainer}
      >
        <Carousel.Item>
          <Image src={third} alt="First slide" width={1600} height={400} />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src={zamansizlar}
            alt="Second slide"
            width={1600}
            height={400}
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={random} alt="Third slide" width={1600} height={400} />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MainCarousel;

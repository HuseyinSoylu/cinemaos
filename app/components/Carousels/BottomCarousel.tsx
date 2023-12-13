"use client";
import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Movie {
  id: string;
  Poster: string;
  ComingSoon: boolean;
  // Add other properties based on your API response
}

const BottomCarousel: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/films");
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        throw new Error("Error fetching movies");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5.5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="container-fluid mt-5">
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-vision"
          role="tabpanel"
          aria-labelledby="pills-vision-tab"
        >
          <div className="multiCarousel">
            <Carousel responsive={responsive} autoPlay={false}>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                movies.map((item, index) => (
                  <div className="card" key={index}>
                    <a href={`/movie/${item.id}`}>
                      <img
                        src={item.Poster}
                        alt="Card image cap"
                        width={300}
                        height={400}
                      />
                    </a>
                    <div className="card-body">
                      <a href={`/movie/${item.id}`} className="btn btn-dark">
                        Make Comment
                      </a>
                      <a href={`/movie/${item.id}`} className="btn btn-light">
                        Buy Ticket
                      </a>
                    </div>
                  </div>
                ))
              )}
            </Carousel>
          </div>
        </div>
        {/* Rest of your tab content */}
      </div>
    </div>
  );
};

export default BottomCarousel;

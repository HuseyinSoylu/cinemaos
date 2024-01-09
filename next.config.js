/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.themoviedb.org",
      "ia.media-imdb.com",
      "images-na.ssl-images-amazon.com",
      "picfiles.alphacoders.com",
    ], // Add your domain here
  },
};

module.exports = nextConfig;

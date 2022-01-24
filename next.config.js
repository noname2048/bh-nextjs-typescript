/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["job-book-image.s3.ap-northeast-2.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/books",
        destination: `https://localhost:8000/api/v1/books`,
      },
    ];
  },
};

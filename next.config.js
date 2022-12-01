
const { default: mongoose } = require('mongoose');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['maps.googleapis.com','firebasestorage.googleapis.com'],

  },
  rewrites: async () => {
    return [
      // {
      //   source: "/naver",
      //   destination: "https://www.naver.com/"
      // },
      {
        source: "/google/autocomplete",
        destination: "https://maps.googleapi.com/maps/api/place/autocomplete/",
      },

    ]
  }
}
//외부 경로로 중계해줌
// module.exports = {
//   images: {
//     domains: ['maps.googleapis.com'],
//   },
// }


module.exports = async () => {

  // const MONGODB_URI = process.env.MONGODB_URI;

  // mongoose.connect(MONGODB_URI, { dbName: "airbnb-clone" })
  //   .then(() => console.log("mongoose Init"));


  return nextConfig
    // ,{images: {
    // domains: ['maps.googleapis.com'],
    // }}
  
} 

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['res.cloudinary.com', 'catacpol-bucket.s3.sa-east-1.amazonaws.com'],
  },

  
}

module.exports = nextConfig

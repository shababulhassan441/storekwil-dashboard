/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
    experimental:{
        serverActions:{
            allowedOrigins:["rewards.storekwil.com","perktify.com"]
        }
    }
};

export default nextConfig;

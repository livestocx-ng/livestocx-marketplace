/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["livestocx-media.s3.amazonaws.com", "livestocx-test-media.s3.amazonaws.com", "youtube.com"]
    }
}

module.exports = nextConfig

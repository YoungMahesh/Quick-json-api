module.exports = {
   env: {
      MONGODB_URI: process.env.NODE_ENV == 'development' ? process.env.MONGODB_URI_LOCAL : process.env.MONGODB_URI_ATLAS,
      BASE_URL: process.env.NODE_ENV == 'development' ? process.env.URL_LOCAL : process.env.URL_VERCEL
   }
}
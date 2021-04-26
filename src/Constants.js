// Constants.js
const prod = {
  url: {
    API_URL: "https://servewerx.com",
    IMG_URL:"https://servewerx-space-1.nyc3.digitaloceanspaces.com"
  },
};
const dev = {
  url: {
    API_URL: "http://localhost:4000",
    IMG_URL: "https://servewerx-space-1.nyc3.digitaloceanspaces.com"
  },
};
console.log('process.env:',process.env);
export const config = process.env.NODE_ENV === "development" ? dev : prod;



/*

    API_URL: "http://localhost:4000/api",
    IMG_URL: "http://localhost:4000"
*/
/*
 API_URL: "https://arcane-eyrie-05882.herokuapp.com/api",
    IMG_URL:"https://arcane-eyrie-05882.herokuapp.com"

*/

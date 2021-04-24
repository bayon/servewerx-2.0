// Constants.js
const prod = {
  url: {
    API_URL: "https://servewerx.com/api",
    HOST_URL:"https://servewerx.com"
  },
};
const dev = {
  url: {
    API_URL: "https://servewerx.com/api",
    HOST_URL: "https://servewerx.com"
  },
};
console.log('process.env:',process.env);
export const config = process.env.NODE_ENV === "development" ? dev : prod;



/*

    API_URL: "http://localhost:4000/api",
    HOST_URL: "http://localhost:4000"
*/
/*
 API_URL: "https://arcane-eyrie-05882.herokuapp.com/api",
    HOST_URL:"https://arcane-eyrie-05882.herokuapp.com"

*/

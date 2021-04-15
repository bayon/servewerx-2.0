// Constants.js
const prod = {
  url: {
    API_URL: "https://arcane-eyrie-05882.herokuapp.com/api",
    HOST_URL:"https://arcane-eyrie-05882.herokuapp.com"
  },
};
const dev = {
  url: {
    API_URL: "http://localhost:4000/api",
    HOST_URL: "http://localhost:4000"
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;

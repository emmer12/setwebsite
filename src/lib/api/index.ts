import axios from "axios";

let reqInstance = axios.create({
  headers: {
    "Content-Type": "application/json;charsetUTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default reqInstance;

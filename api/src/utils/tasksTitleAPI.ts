import axios from "axios";

export default axios.create({
  baseURL: process.env.LOREM_FAKER_API_URL,
  timeout: 30000,
})

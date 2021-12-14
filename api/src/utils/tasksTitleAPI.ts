import axios from "axios";
import { environmentVariables } from "../config/environment/environmentVariables";

export default axios.create({
  baseURL: process.env.LOREM_FAKER_API_URL,
  timeout: 30000,
});

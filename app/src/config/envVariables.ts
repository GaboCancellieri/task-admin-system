import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const {
    API_HOST,
    API_PORT,
} = process.env;

export default {
    apiHost: API_HOST,
    apiPort: API_PORT,
}

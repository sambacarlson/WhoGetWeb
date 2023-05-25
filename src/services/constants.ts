let BASE_URL = "";
if (process.env.NODE_ENV !== "production") {
  BASE_URL = "http://127.0.0.0.1:4000/api";
} else {
  BASE_URL = "https://whoget-api.onrender.com/api";
}
export { BASE_URL }
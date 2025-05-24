import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/v1", // Replace with your actual base URL
});

api.interceptors.request.use(
  (config: { headers: { [x: string]: string; Authorization: string; }; }) => {
    const token = localStorage.getItem("jwtToken"); // or from cookie/state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
    }
    return config;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any) => Promise.reject(error)
);

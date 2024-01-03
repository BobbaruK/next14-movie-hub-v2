import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    // api_key: process.env.TMDB_API_KEY,
    api_key: "3af2480834b678e3323531f1a6354d94",
  },
});

class MyAPIClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  };
}

export default MyAPIClient;

import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: process.env.TMDB_AUTHORIZATION,
  },
  params: {
    // api_key: process.env.TMDB_API_KEY,
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

  // TODO: check this any shit
  post = (data: any) => {
    return axiosInstance.post<T>(this.endpoint, data);
  };

  delete = (data: any) => {
    return axiosInstance.delete<T>(this.endpoint, data);
  };
}

export default MyAPIClient;

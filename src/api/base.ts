import axios from "axios";
const { REACT_APP_BASE_PATH: BASE_PATH, REACT_APP_API_KEY: API_KEY } =
  process.env;

const Axios = axios.create({
  baseURL: BASE_PATH,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// 요청 인터셉터 추가하기
Axios.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default Axios;

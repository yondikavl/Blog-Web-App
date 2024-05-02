import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://gorest.co.in/public/v2";

axios.defaults.headers.common[
  "Authorization"
] = `Bearer 74fad66fb79f60177c63a07cd9f179940d65a7f4e5ddc92a646e7dc1d9cf6a11`;

const fetchData = async <ResponseData>(url: string): Promise<ResponseData> => {
  try {
    const { data }: AxiosResponse<ResponseData> = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
    return {} as ResponseData;
  }
};

export const getPost = async (page: number): Promise<any> => {
  if (isNaN(page)) return [];
  const url = `${BASE_URL}/posts?page=${page}&per_page=20`;
  return await fetchData<any[]>(url);
};

export const getPostComments = async (postId: number): Promise<any[]> => {
  if (!postId) return [];
  const url = `${BASE_URL}/posts/${postId}/comments`;
  return await fetchData<any[]>(url);
};

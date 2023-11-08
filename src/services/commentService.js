import axios from "axios";
import { endpoints } from "./data";

export const getMessage = async (postId) => {
  try {
    const { data } = await axios.get(`${endpoints.comments}?postId=${postId}`);
    return data;
  } catch (error) {
    return null;
  }
};

export const postComment = async (newComment) => {
  try {
    const { data, status } = await axios.post(
      `${endpoints.comments}`,
      newComment
    );
    return { data, status };
  } catch (error) {
    return null;
  }
};

export const patchComment = async () => {
  try {
    const { data, status } = await axios.post(`${endpoints.posts}/postId`);
    return { data, status };
  } catch (error) {
    return null;
  }
};

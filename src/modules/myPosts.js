import axios from "axios";

const GET_MY_POSTS_START = "myPosts/GET_MY_POSTS_START";
const GET_MY_POSTS_SUCCESS = "myPosts/GET_MY_POSTS_SUCCESS";
const GET_MY_POSTS_FAIL = "myPosts/GET_MY_POSTS_FAIL";

export const start = () => ({
  type: GET_MY_POSTS_START
});

export const success = posts => ({
  type: GET_MY_POSTS_SUCCESS,
  posts
});

export const fail = error => ({
  type: GET_MY_POSTS_FAIL,
  error
});

export const getMyPosts = token => dispatch => {
  dispatch(start());

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  authAxios
    .get("http://127.0.0.1:8000/api/my-posts/")
    .then(res => {
      dispatch(success(res.data));
    })
    .catch(err => {
      dispatch(fail(err));
    });
};

const initialState = {
  loading: false,
  posts: null,
  error: null
};

export default function myPosts(state = initialState, action) {
  switch (action.type) {
    case GET_MY_POSTS_START:
      return {
        loading: true,
        posts: null,
        error: null
      };

    case GET_MY_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.posts,
        error: null
      };

    case GET_MY_POSTS_FAIL:
      return {
        loading: false,
        posts: null,
        error: action.error
      };

    default:
      return state;
  }
}

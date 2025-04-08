const apiURL = "https://67f563a9913986b16fa46780.mockapi.io/api/";

export const getPosts = async () => {
  const response = await fetch(apiURL + "posts");
  const data = await response.json();
  return data;
};

export const getPost = async (id) => {
  const response = await fetch(apiURL + "posts/" + id);
  const data = await response.json();
  return data;
};

export const createPost = async (post) => {
  const response = await fetch(apiURL + "posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
};

export const updatePost = async (id, post) => {
  const response = await fetch(apiURL + "posts/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
};

export const deletePost = async (id) => {
  const response = await fetch(apiURL + "posts/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const apiURL = "https://67f563a9913986b16fa46780.mockapi.io/api/";

export const getPosts = async () => {
  const response = await fetch(apiURL + "posts");
  const data = await response.json();
  return data;
};

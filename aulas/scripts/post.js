document.addEventListener("DOMContentLoaded", function () {
  fetchPost();
});

function fetchPost() {
  const postId = window.location.search.split("=")[1];
  fetch("api/profile.json")
    .then((response) => response.json())
    .then((result) => {
      const data = result.user.posts.find((post) => post.id === Number(postId));
      renderPost(data);
    });
}

function renderPost(data) {
  const heroContainer = document.getElementById("hero-container");
  const title = document.getElementById("hero-title");
  const postContent = document.getElementById("post-content");
  const postGallery = document.getElementById("post-gallery");
  title.innerHTML = data.title;
  heroContainer.style.backgroundImage = `url(${data.gallery[0].url})`;
  heroContainer.style.backgroundSize = "cover";
  heroContainer.style.backgroundPosition = "center";
  heroContainer.style.backgroundRepeat = "no-repeat";
  postContent.innerHTML = data.content;
  postGallery.innerHTML = data.gallery
    .map((image) => {
      return `<img src="${image.url}" alt="${image.alt}" />`;
    })
    .join("");
}

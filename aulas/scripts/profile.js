document.addEventListener("DOMContentLoaded", function () {
  fetchProfile();
});

function fetchProfile() {
  fetch("api/profile.json")
    .then((response) => response.json())
    .then((result) => {
      renderProfile(result.user);
      renderPosts(result.user.posts);
    });
}

function renderProfile(data) {
  const name = document.getElementById("hero-title");
  const email = document.getElementById("hero-description");
  name.innerHTML = data.name;
  email.innerHTML = data.email;
}

function renderPosts(data) {
  const posts = document.getElementById("posts-container");
  posts.innerHTML = data
    .map((post) => {
      return `<div class="post-card">
      <div class="post-image">
        <img src="${post.gallery[0].url}" alt="${post.title}">
      </div>
      <div class="post-content">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      </div>
      <a class="read-more" href="/aulas/post.html?id=${post.id}">Read More</a>
      </div>`;
    })
    .join("");
}

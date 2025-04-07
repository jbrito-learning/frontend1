document.addEventListener("DOMContentLoaded", function () {
  fetchProfile();
});

window.addEventListener("storage", function () {
  fetchProfile();
});

function fetchProfile() {
  const profile = localStorage.getItem("profile");
  if (profile) {
    renderProfile(JSON.parse(profile).user);
    renderPosts(JSON.parse(profile).user.posts);
  } else {
    fetch("api/profile.json")
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("profile", JSON.stringify(result));
        renderProfile(result.user);
        renderPosts(result.user.posts);
      });
  }
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
      const secretKey = "secret";
      const decryptedTitle = CryptoJS.AES.decrypt(
        post.title,
        secretKey
      ).toString(CryptoJS.enc.Utf8);
      return `<div class="post-card">
      <div class="post-image">
        <img src="${post.gallery[0].url}" alt="${post.title}">
      </div>
      <div class="post-content">
        <h3>${decryptedTitle}</h3>
        <p>${post.content}</p>
      </div>
      <a class="read-more" href="/aulas/post.html?id=${post.id}">Read More</a>
      </div>`;
    })
    .join("");
}

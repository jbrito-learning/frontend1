import { getPosts } from "../lib/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await getPosts();

  const postList = document.getElementById("post-list");
  posts.forEach((post) => {
    const postItem = document.createElement("div");
    postItem.classList.add("post-item");
    postItem.innerHTML = `
        <img class="post-image" src="${post.image}" alt="${post.title}">
        <h3 class="post-title">${post.title}</h3>
        <p class="post-content">${post.content}</p>
        <div class="post-author">
            <div class="post-author-info">
                <img class="post-author-avatar" src="${post.avatar}" alt="${
      post.author
    }"/>
                <div class="post-author-name">${post.author}</div>
            </div>
            <div class="post-date">${new Date(
              post.createdAt
            ).toLocaleDateString("pt-PT", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}</div>
        </div>
    `;
    postList.appendChild(postItem);
  });
});

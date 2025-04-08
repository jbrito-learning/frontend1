import { getPosts, createPost } from "../lib/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await getPosts();
  displayPosts(posts);
  setupModal();
});

function displayPosts(posts) {
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
}

function setupModal() {
  const modal = document.getElementById("add-post-modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModal = document.querySelector(".close-modal");
  const addPostForm = document.getElementById("add-post-form");

  // Open modal
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    addPostForm.reset();
  });

  // Close when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      addPostForm.reset();
    }
  });

  // Handle form submission
  addPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newPost = {
      title: document.getElementById("post-title").value,
      content: document.getElementById("post-content").value,
      image: document.getElementById("post-image").value,
      author: document.getElementById("post-author").value,
      avatar: document.getElementById("post-avatar").value,
      createdAt: new Date().toISOString(),
    };

    try {
      await createPost(newPost);
      const updatedPosts = await getPosts();
      displayPosts(updatedPosts);
      modal.style.display = "none";
      addPostForm.reset();
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post. Please try again.");
    }
  });
}

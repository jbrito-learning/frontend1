import { getPosts, createPost, updatePost, deletePost } from "../lib/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Show loading indicator
  showLoading();

  try {
    const posts = await getPosts();
    displayPosts(posts);
  } catch (error) {
    console.error("Error loading posts:", error);
    showError("Failed to load posts. Please try again later.");
  } finally {
    // Hide loading indicator
    hideLoading();
  }

  setupModal();
});

function showLoading() {
  const postList = document.getElementById("post-list");
  postList.innerHTML = `
    <div class="loading-indicator">
      <div class="spinner"></div>
      <p>Loading posts...</p>
    </div>
  `;
}

function hideLoading() {
  const loadingIndicator = document.querySelector(".loading-indicator");
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}

function showError(message) {
  const postList = document.getElementById("post-list");
  postList.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      <p>${message}</p>
    </div>
  `;
}

function displayPosts(posts) {
  const postList = document.getElementById("post-list");
  postList.innerHTML = "";

  posts.forEach((post) => {
    const postItem = document.createElement("div");
    postItem.classList.add("post-item");
    postItem.innerHTML = `
        <div class="post-actions">
            <button class="edit-post-btn" data-id="${
              post.id
            }"><i class="fas fa-edit"></i></button>
            <button class="delete-post-btn" data-id="${
              post.id
            }"><i class="fas fa-trash"></i></button>
        </div>
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

  // Add event listeners for edit and delete buttons
  setupPostActions();
}

function setupPostActions() {
  // Setup edit buttons
  document.querySelectorAll(".edit-post-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const postId = e.currentTarget.dataset.id;
      openEditModal(postId);
    });
  });

  // Setup delete buttons
  document.querySelectorAll(".delete-post-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const postId = e.currentTarget.dataset.id;

      if (confirm("Are you sure you want to delete this post?")) {
        try {
          showLoading();
          await deletePost(postId);
          const updatedPosts = await getPosts();
          displayPosts(updatedPosts);
        } catch (error) {
          console.error("Error deleting post:", error);
          showError("Failed to delete post. Please try again.");
        } finally {
          hideLoading();
        }
      }
    });
  });
}

async function openEditModal(postId) {
  try {
    const modal = document.getElementById("add-post-modal");
    const modalTitle = modal.querySelector("h2");
    const form = document.getElementById("add-post-form");
    const submitButton = form.querySelector(".submit-button");

    // Change the modal title and button text
    modalTitle.textContent = "Edit Post";
    submitButton.textContent = "Update Post";

    // Get the post data
    const posts = await getPosts();
    const post = posts.find((p) => p.id === postId);

    if (!post) {
      alert("Post not found!");
      return;
    }

    // Fill the form with the post data
    document.getElementById("post-title").value = post.title;
    document.getElementById("post-content").value = post.content;
    document.getElementById("post-image").value = post.image;
    document.getElementById("post-author").value = post.author;
    document.getElementById("post-avatar").value = post.avatar;

    // Add a data attribute to the form to mark it as edit mode
    form.dataset.mode = "edit";
    form.dataset.postId = postId;

    // Show the modal
    modal.style.display = "flex";
  } catch (error) {
    console.error("Error opening edit modal:", error);
    alert("Failed to load post data. Please try again.");
  }
}

function setupModal() {
  const modal = document.getElementById("add-post-modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModal = document.querySelector(".close-modal");
  const addPostForm = document.getElementById("add-post-form");

  // Open modal for new post
  openModalBtn.addEventListener("click", () => {
    const modalTitle = modal.querySelector("h2");
    const submitButton = addPostForm.querySelector(".submit-button");

    // Reset to add mode
    modalTitle.textContent = "Add New Post";
    submitButton.textContent = "Add Post";
    addPostForm.dataset.mode = "add";
    delete addPostForm.dataset.postId;

    // Reset form
    addPostForm.reset();

    // Show modal
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

  // Handle form submission (create or update)
  addPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postData = {
      title: document.getElementById("post-title").value,
      content: document.getElementById("post-content").value,
      image: document.getElementById("post-image").value,
      author: document.getElementById("post-author").value,
      avatar: document.getElementById("post-avatar").value,
    };

    try {
      modal.style.display = "none";
      showLoading();

      // Check if we're in edit mode
      if (addPostForm.dataset.mode === "edit") {
        const postId = addPostForm.dataset.postId;
        await updatePost(postId, postData);
      } else {
        // We're in add mode
        postData.createdAt = new Date().toISOString();
        await createPost(postData);
      }

      // Refresh the post list and reset the form
      const updatedPosts = await getPosts();
      displayPosts(updatedPosts);
      addPostForm.reset();
    } catch (error) {
      console.error("Error saving post:", error);
      showError("Failed to save post. Please try again.");
    } finally {
      hideLoading();
    }
  });
}

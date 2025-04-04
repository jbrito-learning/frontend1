document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  // Close the menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".navbar") &&
      navLinks.classList.contains("active")
    ) {
      navLinks.classList.remove("active");
    }
  });

  // Load blog posts from JSON
  fetchBlogPosts();
});

// Function to fetch blog posts
async function fetchBlogPosts() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    if (data.featuredPosts) {
      renderPosts(data.featuredPosts, "featured-posts-container");
    }

    if (data.recentPosts) {
      renderPosts(data.recentPosts, "recent-posts-container");
    }

    // Display favorite posts
    displayFavoritePosts(data);
  } catch (error) {
    console.error("Error fetching blog posts:", error);

    // If fetch fails, use this fallback data
    const fallbackData = {
      featuredPosts: [
        {
          id: 1,
          title: "Fallback Featured Post",
          excerpt:
            "This is a fallback post when the JSON file cannot be loaded.",
          category: "General",
          image: "https://picsum.photos/400/600",
          author: "Admin",
          date: "January 1, 2023",
          readTime: "3 min read",
        },
      ],
      recentPosts: [
        {
          id: 2,
          title: "Fallback Recent Post",
          excerpt:
            "This is a fallback post when the JSON file cannot be loaded.",
          category: "General",
          image: "https://picsum.photos/400/600",
          author: "Admin",
          date: "January 1, 2023",
          readTime: "3 min read",
        },
      ],
    };

    renderPosts(fallbackData.featuredPosts, "featured-posts-container");
    renderPosts(fallbackData.recentPosts, "recent-posts-container");
    displayFavoritePosts(fallbackData);
  }
}

// Function to display favorite posts
function displayFavoritePosts(data) {
  const favorites = getFavorites();
  const favoriteSection = document.getElementById("favorite-posts-section");

  if (favorites.length === 0) {
    favoriteSection.style.display = "none";
    return;
  }

  favoriteSection.style.display = "block";

  // Combine all posts to filter by favorites
  const allPosts = [...data.featuredPosts, ...data.recentPosts];
  const favoritePosts = allPosts.filter((post) => favorites.includes(post.id));

  renderPosts(favoritePosts, "favorite-posts-container");
}

// Get favorites from localStorage
function getFavorites() {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
}

// Save favorites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Function to toggle favorite status of a post
function toggleFavorite(postId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(postId);

  if (index === -1) {
    favorites.push(postId);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);

  // Update UI for all instances of this post
  document
    .querySelectorAll(`.favorite-btn[data-id="${postId}"]`)
    .forEach((btn) => {
      btn.classList.toggle("active");
    });

  // Refresh favorite posts section
  fetchBlogPosts();
}

// Function to check if a post is favorited
function isFavorite(postId) {
  const favorites = getFavorites();
  return favorites.includes(postId);
}

// Function to render posts to the DOM
function renderPosts(posts, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let postsHTML = "";

  posts.forEach((post) => {
    const isFav = isFavorite(post.id);
    postsHTML += `
      <article class="post-card">
        <div class="post-image">
          <img src="${post.image}" alt="${post.title}">
          <button class="favorite-btn ${isFav ? "active" : ""}" data-id="${
      post.id
    }">
            <i class="fas fa-star"></i>
          </button>
        </div>
        <div class="post-content">
          <span class="post-category">${post.category}</span>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-excerpt">${post.excerpt}</p>
          <div class="post-meta">
            <span>${post.author}</span>
            <span>${post.date} · ${post.readTime}</span>
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = postsHTML;

  // Add event listeners to favorite buttons
  container.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const postId = parseInt(this.getAttribute("data-id"));
      toggleFavorite(postId);
    });
  });
}

// Function to filter posts by category (for future use)
function filterPostsByCategory(category) {
  // This function can be implemented later for category filtering
  console.log("Filtering by category:", category);
}

// Function to search posts (for future use)
function searchPosts(query) {
  // This function can be implemented later for search functionality
  console.log("Searching for:", query);
}

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
    const response = await fetch("blog-data.json");
    const data = await response.json();

    if (data.featuredPosts) {
      renderPosts(data.featuredPosts, "featured-posts-container");
    }

    if (data.recentPosts) {
      renderPosts(data.recentPosts, "recent-posts-container");
    }
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
  }
}

// Function to render posts to the DOM
function renderPosts(posts, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let postsHTML = "";

  posts.forEach((post) => {
    postsHTML += `
      <article class="post-card">
        <div class="post-image">
          <img src="${post.image}" alt="${post.title}">
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

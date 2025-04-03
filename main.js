async function getHeroContent() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    updateHeroContent(data.hero);
  } catch (error) {}
}

function updateHeroContent(post) {
  const heroTitle = document.getElementById("hero-title");
  const heroDescription = document.getElementById("hero-description");
  heroTitle.textContent = post.title;
  heroDescription.textContent = post.description;
}

getPosts();

async function getHeroContent() {
  try {
    const hasInfo = localStorage.getItem("heroInfo");
    if (hasInfo) {
      updateHeroContent(JSON.parse(hasInfo));
      return null;
    }
    const response = await fetch("hero.json");
    const data = await response.json();
    localStorage.setItem("heroInfo", JSON.stringify(data));
  } catch (error) {}
}

function updateHeroContent(hero) {
  const heroTitle = document.getElementById("hero-title");
  const heroDescription = document.getElementById("hero-description");
  heroTitle.textContent = hero.title;
  heroDescription.textContent = hero.description;
}

getHeroContent();

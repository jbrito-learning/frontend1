document.addEventListener("DOMContentLoaded", () => {
  const breedForm = document.getElementById("dog-breed-form");
  const resultDiv = document.getElementById("dog-result");

  breedForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Clear previous results
    resultDiv.innerHTML = "";

    // Show loading indicator
    resultDiv.innerHTML = `
      <div class="loading-indicator">
        <div class="spinner"></div>
        <p>Fetching dog image...</p>
      </div>
    `;

    const breedInput = document.getElementById("breed-input");
    const breed = breedInput.value.trim().toLowerCase();

    if (!breed) {
      showError("Please enter a dog breed");
      return;
    }

    try {
      // Fetch dog image from API
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      const data = await response.json();

      if (data.status === "success") {
        // Display the dog image
        resultDiv.innerHTML = `
          <div class="dog-image-container">
            <img src="${data.message}" alt="${breed}" class="dog-image">
            <p class="dog-breed-name">${
              breed.charAt(0).toUpperCase() + breed.slice(1)
            }</p>
          </div>
        `;
      } else {
        showError(`Breed "${breed}" not found. Please try another breed.`);
      }
    } catch (error) {
      console.error("Error fetching dog image:", error);
      showError("Failed to fetch dog image. Please try again later.");
    }
  });

  function showError(message) {
    resultDiv.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <p>${message}</p>
      </div>
    `;
  }
});

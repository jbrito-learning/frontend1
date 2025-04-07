document.addEventListener("DOMContentLoaded", function () {
  const addPostForm = document.getElementById("add-post-form");
  addPostForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = addPostForm.title.value;
    const content = addPostForm.content.value;
    const gallery = [
      {
        url: "https://placehold.co/600x400",
        id: 1,
      },
      {
        url: "https://placehold.co/600x400",
        id: 2,
      },
      {
        url: "https://placehold.co/600x400",
        id: 3,
      },
    ];
    const secretKey = "secret";
    const encryptedTitle = CryptoJS.AES.encrypt(title, secretKey).toString();
    const post = {
      title: encryptedTitle,
      content,
      gallery,
      datePublish: new Date().toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
    const profile = localStorage.getItem("profile");
    const profileData = JSON.parse(profile);
    profileData.user.posts.push(post);
    localStorage.setItem("profile", JSON.stringify(profileData));
    window.location.href = "/aulas/profile.html";
  });
});

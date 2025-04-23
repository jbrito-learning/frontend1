class SharedNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header>
      <nav class="navbar">
        <div class="brand">
          <h1>My Blog</h1>
        </div>
        <div class="menu-toggle">
          <i class="fas fa-bars"></i>
        </div>
        <ul class="nav-links">
          <li><a href="/aulas" class="active">Home</a></li>
          <li><a href="/aulas/blog.html">Blog</a></li>
          <li><a href="/aulas/profile.html">Profile</a></li>
          <li><a href="/aulas/playground.html">Playground</a></li>
        </ul>
      </nav>
    </header>`;
  }
}

customElements.define("shared-navbar", SharedNavbar);

class SharedFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
      <div class="footer-content">
        <div class="footer-section about">
          <h3>About My Blog</h3>
          <p>
            A platform sharing thoughts, ideas, and stories about various topics
            of interest.
          </p>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div class="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/aulas">Home</a></li>
            <li><a href="/aulas/blog.html">Blog</a></li>
            <li><a href="/aulas/profile.html">Profile</a></li>
            <li><a href="/aulas/playground.html">Playground</a></li>
          </ul>
        </div>
        <div class="footer-section contact">
          <h3>Contact Us</h3>
          <p><i class="fas fa-envelope"></i> contact@myblog.com</p>
          <p><i class="fas fa-phone"></i> +1 234 567 8900</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 My Blog. All rights reserved.</p>
      </div>
    </footer>`;
  }
}

customElements.define("shared-footer", SharedFooter);

class TestWebComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<p>Hello World 2</p>`;
  }
}

customElements.define("test-web-component", TestWebComponent);

class ShadowButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Get the attribute value or use default
    const buttonText = this.getAttribute("button-text") || "Hello World";

    shadow.innerHTML = `
    <style>
      button {
        background-color: #4361ee;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
      }
    </style>
    <button>${buttonText}</button>`;
  }
}

customElements.define("shadow-button", ShadowButton);

class CustomParagraph extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById("custom-paragraph");
    let templateContent = template.content;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

customElements.define("my-paragraph", CustomParagraph);

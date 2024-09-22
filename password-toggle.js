class PasswordToggle extends HTMLElement {
  static register(tag = "password-toggle") {
    if ("customElements" in window) {
      customElements.define(tag, this);
    }
  }

  connectedCallback() {
    this.input = document.getElementById(this.dataset.inputId);
    this.status = document.getElementById(this.dataset.statusId);
    this.btn = this.querySelector("button");

    if (!this.input || !this.btn) return;

    this.btn.ariaPressed = false;
    this.btn.ariaLabel = "Show password";
    this.btn.setAttribute("aria-controls", this.dataset.inputId);
    this.btn.addEventListener("click", this);
  }

  handleEvent(e) {
    if (this.input.type === "password") {
      this.btn.ariaPressed = true;
      this.btn.ariaLabel = "Hide password";
      this.input.type = "text";

      if (this.status) this.status.textContent = "Password is showing";
    } else {
      this.btn.ariaPressed = false;
      this.btn.ariaLabel = "Show password";
      this.input.type = "password";

      if (this.status) this.status.textContent = "Password is hidden";
    }
  }
}

PasswordToggle.register();

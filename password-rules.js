class PasswordRules extends HTMLElement {
  static register(tag = "password-rules") {
    if ("customElements" in window) {
      customElements.define(tag, this);
    }
  }

  connectedCallback() {
    this.input = document.getElementById(this.dataset.inputId);

    if (!this.input) return;

    this.rules = [];
    this.setupRules();
    this.input.addEventListener("input", this);
  }

  handleEvent(e) {
    this.score = 0;

    for (let [index, rule] of this.rules.entries()) {
      const match = e.target.value.match(rule);

      if (match) this.score++;

      this.toggleMatchedRuleClass(index, match);
    }

    this.setAttributes("score", this.score);
  }

  setAttributes(name, value) {
    this.dataset[name] = value;
    this.style.setProperty(`--${name}`, value);
  }

  setupRules() {
    const rules = this.dataset.rules;

    if (!rules) return;

    rules.split(this.dataset.separator || ",").forEach((match) => {
      this.rules.push(new RegExp(match.trim()));
    });

    this.setAttributes("total", this.rules.length);
  }

  toggleMatchedRuleClass(index, value) {
    const el = this.querySelector(`[data-rule-index="${index}"]`);

    if (!el) return;

    el.classList.toggle("is-match", value);
  }
}

PasswordRules.register();

# Password input components

A set of Web Components that enhances an HTML password input with a few extra utilities.

✨ [CodePen demo](https://codepen.io/hexagoncircle/pen/LYKKjmj)

- `<password-rules>` watches for when rules (password length, includes an uppercase letter, etc.) are met while the user is typing in a new password.
- `<password-toggle>` shows and hides the password input value on click.

## Get started

Include the scripts on the page:

```html
<script type="module" src="path/to/password-rules.js"></script>
<script type="module" src="path/to/password-toggle.js"></script>
```

Starter template utilizing both components:

```html
<label for="new-password">Password</label>
<input type="password" id="new-password" />
<div id="status" class="visually-hidden" aria-live="polite"></div>

<password-toggle data-input-id="new-password" data-status-id="status">
  <button type="button">Toggle password visibility</button>
</password-toggle>

<password-rules data-input-id="new-password" data-rules=".{8}, [A-Z], .*\d">
  <ul>
    <li data-rule-index="0">Longer than 8 characters</li>
    <li data-rule-index="1">Includes an uppercase letter</li>
    <li data-rule-index="2">Includes a number</li>
  </ul>
</password-rules>
```

## Password Rules

- `data-input-id` matches the `id` value of the targeted input element.
- `data-rules` takes a comma-separated list of [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) that are checked as the user types in the password input.
- `data-separator` (optional) splits the `data-rules` on this value when setting up the array of rules instead of the default comma (`,`) separator.
- `data-rule-index` (optional) added to child elements within this component. When a particular rule is matched/unmatched, an `is-match` class is toggled on the child element.
  - Example: In the template above, the `[A-Z]` rule resides at index `1`. When an uppercase letter is typed into the password input, the match class will be added to the element containing `data-rule-index="1"`. If the uppercase letter is deleted, the match class is removed.

### Rule styles

A `data-score` value is updated as each rule is matched. We can leverage this in our CSS. For example, we could insert an indicator element and update its background color as the score changes:

```css
password-rules .indicator {
  width: 2rem;
  height: 0.5rem;
  background-color: lightgray;
}

password-rules[data-score="1"] .indicator {
  background-color: blue;
}
password-rules[data-score="2"] .indicator {
  background-color: yellowgreen;
}
password-rules[data-score="3"] .indicator {
  background-color: green;
}
```

CSS variables for `--score` and `--total` are added to the custom element. In the demo, those are used to render the current tally via a pseudo element ruleset using a CSS `counter()`.

```css
.password-rules__score::before {
  counter-reset: score var(--score, 0) total var(--total, 3);
  content: counter(score) "/" counter(total);
}
```

_Note:_ Fallback values are provided to the CSS variables. Specifically, the `--total` value does not update initially when the Web Component script runs. We could skip the fallback and instead [register those custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/@property):

```css
@property --total {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}
```

If a child of the custom element contains a `data-rule-index` attribute, an `is-match` class is added to it as the corresponding rule is matched.

```css
li {
  color: black;
}

li.is-match {
  color: green;
}
```

Check out the CSS panel in [CodePen demo](https://codepen.io/hexagoncircle/pen/LYKKjmj?editors=0100) and mess around a bit!

## Password Toggle

Wrap a `button` with the custom element:

```html
<password-toggle data-input-id="new-password" data-status-id="status">
  <button type="button">Toggle password visibility</button>
</password-toggle>
```

- `data-input-id` matches the `id` value of the targeted input element.
- `data-status-id` matches the `id` value of an element where the visibility status text can be rendered. This element should contain an `aria-live="polite"` attribute. When the toggle button is clicked, a screen reader announces that the password input value is currently visible or hidden.

When the component script runs, `aria-pressed`, `aria-label` and `aria-controls` attributes are added to the button element. The `aria-controls` value is equal to the targeted password input `id`.

On click, `aria-pressed` toggles between `true` (password showing) and `false` (password hidden) while the `aria-label` string updates to match the current button action. For example, if `aria-pressed="true"` then the `aria-label` value becomes "Hide password". The current _status_ is also reflected as a text value in the targeted live region.

### Toggle styles

Lean on the `aria-pressed` state for custom styling.

```css
button {
  border: 1px solid black;
}

button[aria-pressed="true"] {
  border-color: green;
}
```

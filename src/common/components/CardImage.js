import { html, LitElement } from 'lit'

export class CardImage extends LitElement {
  static properties = {
    url: { type: String },
    name: { type: String },
    loading: { type: String },
    height: { type: Number },
    width: { type: Number },
  }

  render() {
    return html`
      <img
        loading="${this.loading}"
        width="${this.width}"
        height="${this.height}"
        src="${this.url}"
        alt="${this.name}"
      />
    `
  }
}

customElements.define('cm-image', CardImage)

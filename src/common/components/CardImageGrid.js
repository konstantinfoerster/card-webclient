import { css, html, LitElement } from 'lit'

export class CardImageGrid extends LitElement {

  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, 260px);
        justify-content: space-evenly;
        row-gap: 1.5rem;
      }
    `
  }

  render() {
    return html`
      <slot></slot>
    `
  }

}

customElements.define('cm-image-grid', CardImageGrid)

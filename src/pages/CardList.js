import { LitElement, html } from 'lit'

export class CardList extends LitElement {
  render() {
    return html`
      <div>
        <h2>Here are some cards</h2>
      </div>
    `
  }
}

customElements.define('card-list', CardList)

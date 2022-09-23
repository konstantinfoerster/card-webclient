import { LitElement, html } from 'lit'

export class NotFound extends LitElement {
  render() {
    return html`<div>404: Page Not Found</div> `
  }
}

customElements.define('not-found', NotFound)

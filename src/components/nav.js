import { css, html, LitElement } from 'lit'
import SlDropdown from '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js';
import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.js';

export class CardPageNav extends LitElement {
  static shadowRootOptions = {...LitElement.shadowRootOptions, mode: 'open'};

  static get styles() {
    return css`
      nav {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .item {
        float: left;
      }
      .item.dropdown-selection {
        margin-left: auto;
      }
    `
  }

  render() {
    return html`

    `
  }
}

customElements.define('card-page-nav', CardPageNav)

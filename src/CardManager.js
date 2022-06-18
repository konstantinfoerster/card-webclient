import { css, html, LitElement } from 'lit'
import { Router } from '@vaadin/router'
import SlDropdown from '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js';
import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import SlIconButton from '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import { CardPageNav } from './components/nav.js'

// TODO html directly into the index.html?
class CardManager extends LitElement {
  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('app'))
    router
      .setRoutes([
        {
          path: '/',
          action: async () => {
            await import('./pages/CardList.js')
          },
          component: 'card-list',
        },
        {
          path: '(.*)',
          action: async () => {
            await import('./pages/NotFound.js')
          },
          component: 'not-found',
        },
      ])
      .then(r => {
        console.log('router initialized')
      })
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
      }

      main {
        flex-grow: 1;
      }

      header {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 0 1.5em;
        box-sizing: border-box;
        border-bottom: 1px solid var(--sl-color-neutral-300);
        box-shadow: var(--sl-shadow-small)
      }
      header > nav {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3em 0;
      }
    `
  }

  render() {
    return html`
      <div>
        <header>
          <nav>
            <div>Logo</div>
            <div class='item dropdown-selection'>
              <sl-dropdown>
                <sl-icon-button slot="trigger" name="gear" label="Settings" style="font-size: 1.2rem;"></sl-icon-button>
                <sl-menu>
                  <sl-menu-item value="cut">Cut</sl-menu-item>
                  <sl-menu-item value="copy">Copy</sl-menu-item>
                  <sl-menu-item value="paste">Paste</sl-menu-item>
                </sl-menu>
              </sl-dropdown>
            </div>
          </nav>
        </header>
        <div id="app"></div>
      </div>
    `
  }
}

customElements.define('card-manager', CardManager)

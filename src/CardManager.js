import { css, html, LitElement } from 'lit'
import { Router } from '@vaadin/router'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'

// TODO html directly into the index.html?
class CardManager extends LitElement {
  static properties = {
    _router: { state: true },
  }

  async firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('app'))
    this._router = router
    router
      .setRoutes([
        {
          path: '/',
          action: async () => {
            await import('./modules/dashboard/Dashboard.js')
          },
          component: 'cm-dashboard',
        },
        {
          path: '/search',
          action: async () => {
            await import('./modules/search/SearchResult.js')
          },
          component: 'cm-search-result',
        },
        {
          path: '(.*)',
          action: async () => {
            await import('./modules/common/NotFound.js')
          },
          component: 'not-found',
        },
      ])
      .then(r => {
        console.log('router initialized', r)
      })
  }

  static get styles() {
    return css`
      header {
        padding: 0 1.5rem;
        box-sizing: border-box;
        border-bottom: 1px solid var(--sl-color-neutral-300);
        box-shadow: var(--sl-shadow-small);
      }
      header > nav {
        display: flex;
        justify-content: flex-end;
        column-gap: 1rem;
        align-items: center;
        padding: 0.3em 0;
      }
      main {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        padding: 1rem 0;
      }

      #app {
        width: 960px;
      }

      .logo {
        margin-right: auto;
      }

      .logo a {
        text-decoration: none;
        color: inherit;
      }

      .search-form {
        flex: 0 1 325px;
      }

      sl-icon-button::part(base) {
        font-size: 1.2rem;
      }
    `
  }

  itemSelected(event) {
    const selectedItem = event.detail.item
    console.log(selectedItem.value)
  }

  onSearch(event) {
    event.preventDefault()

    const formElement = event.path[0]
    const data = new FormData(formElement)
    Router.go({
      pathname: '/search',
      search: `?name=${data.get('search').toString()}`,
    })

    this.shadowRoot.querySelector('.search').blur()
  }

  render() {
    return html`
      <header>
        <nav>
          <div class="logo">
            <a href="/">Logo</a>
          </div>
          <form class="search-form" @submit="${this.onSearch}">
            <sl-input
              placeholder="Eager Cadet"
              size="small"
              type="search"
              name="search"
              class="search"
            >
              <sl-icon name="search" slot="prefix"></sl-icon>
            </sl-input>
          </form>
          <sl-dropdown @sl-select="${this.itemSelected}">
            <sl-icon-button
              slot="trigger"
              name="gear"
              label="Settings"
            ></sl-icon-button>
            <sl-menu>
              <sl-menu-item value="cut">Cut</sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        </nav>
      </header>
      <main>
        <div id="app"></div>
      </main>
    `
  }
}

customElements.define('card-manager', CardManager)

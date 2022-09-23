import { LitElement, html } from 'lit'

import store from '../../store/store.js'
import { fetchByName, nextPage } from './slice.js'
import { connect } from '../../store/helper.js'
import '../../common/components/CardImageGrid.js'
import '../../common/components/CardImage.js'

export class SearchResult extends connect(store)(LitElement) {

  static properties = {
    _cards: { state: true },
    _loading: { state: true },
  }

  constructor() {
    super()

    this._cards = []
    this._loading = false
  }

  _stateChanged(state) {
    this._cards = state.list.map(
      url => ({ url, width: 260, height: 362, name: 'card' }))
    this._loading = state.loading
  }

  onBeforeEnter(location) {
    const searchTerm = new URLSearchParams(location.search).get('name')
    store.dispatch(fetchByName({query: searchTerm}))
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('scroll', this.loadOnScroll)
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.loadOnScroll);
    super.disconnectedCallback();
  }

  loadOnScroll() {
    const documentHeight = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const threshold = 0.75;
    if(currentScroll / documentHeight > threshold) {
      store.dispatch(nextPage())
    }
  }

  render() {
    return html`
      <cm-image-grid>
        ${this._cards.map((image, index) => html`
          <cm-image
            url='${image.url}'
            name='${image.name}'
            loading='${index > 5 ? 'lazy' : 'eager'}'
            width='${image.width}'
            height='${image.height}'
          >
          </cm-image>
        `)}
      </cm-image-grid>
    `
  }
}

customElements.define('cm-search-result', SearchResult)

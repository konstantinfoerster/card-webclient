import { html } from 'lit'
import { fixture, expect } from '@open-wc/testing'
import '../../src/pages/CardList.js'

describe('CardList', () => {
  let element
  beforeEach(async () => {
    element = await fixture(html`<card-list></card-list>`)
  })

  it('renders a dummy text', () => {
    const el = element.shadowRoot.querySelector('h2')
    expect(el).to.exist
    expect(el.textContent).to.equal('List placeholder')
  })

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible()
  })
})

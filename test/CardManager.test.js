import { html } from 'lit'
import { fixture, expect } from '@open-wc/testing'

import '../src/CardManager.js'

describe('CardManager', () => {
  let element
  beforeEach(async () => {
    element = await fixture(html`<card-manager></card-manager>`)
  })

  it('renders a the page title', () => {
    const el = element.shadowRoot.querySelector('nav')
    expect(el).to.exist
    expect(el.textContent).to.equal('Card Manager')
  })

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible()
  })
})

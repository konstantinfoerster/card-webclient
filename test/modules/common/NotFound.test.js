import { html } from 'lit'
import { fixture, expect } from '@open-wc/testing'

import '../../../src/modules/common/NotFound.js'

describe('not-found', () => {
  let element
  beforeEach(async () => {
    element = await fixture(html`<not-found></not-found>`)
  })

  it('renders 404 text', () => {
    const el = element.shadowRoot.querySelector('div')
    expect(el).to.exist
    expect(el.textContent).to.equal('404: Page Not Found')
  })

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible()
  })
})

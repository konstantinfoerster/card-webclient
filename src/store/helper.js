export const connect = (store) => (baseElement) => class extends baseElement {

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback()
    }

    this._storeUnsubscribe = store.subscribe(() => this._stateChanged(store.getState()))
    this._stateChanged(store.getState())
  }

  disconnectedCallback() {
    this._storeUnsubscribe()

    if (super.disconnectedCallback) {
      super.disconnectedCallback()
    }
  }

  // eslint-disable-next-line no-unused-vars
  _stateChanged(state) {
  }
}

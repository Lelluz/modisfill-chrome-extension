class WelcomeLayer {

  constructor() {
    this.mainLayer = document.querySelector('#main')
    this.welcomeLayer = null
  }

  _append(template) {
    this.mainLayer.insertAdjacentHTML('beforeend', template)
  }

  _generate() {

    this._append(`
      <div class="welcomeOverlay">
        <p class="instructionsMessage">Go to your WTC page and click the button below</p>
        <a class="button" name="scan" href="#">Scan</a>
      </div>
    `)
    this.welcomeLayer = this.mainLayer.querySelector('.welcomeOverlay')
  }

  _hide() {
    this.welcomeLayer.parentElement.removeChild(this.welcomeLayer)
  }

  _setEvents() {

    document.querySelector('.button[name=scan]').addEventListener('click', () => {
      chrome.tabs.query({ currentWindow: true, active: true },
        tabs => {
          chrome.tabs.sendMessage(tabs[0].id, 'scan button click', result => {
            if (result) this._hide()
          })
      })
    }, false)

  }

  init() {
    this._generate()
    this._setEvents()
  }

}

export default new WelcomeLayer()
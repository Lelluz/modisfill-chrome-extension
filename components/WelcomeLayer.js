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
        <p class="instructionsMessage">Apri la tabella oraria nella tua area personale Modis o Adecco e premi il bottone qui sotto</p>
        
        <div class="link-list">
          <a href="https://candidate.it.modis.com/candidate/login.asp" name="modisLink">Modis Candidate</a>
          <a href="https://candidate.adecco.it/candidate/login.asp" name="adeccoLink">Adecco Candidate</a>
        </div>
        
        <a class="button" name="scan" href="#">Table scan</a>
      </div>
    `)
    this.welcomeLayer = this.mainLayer.querySelector('.welcomeOverlay')
  }

  _hide() {
    this.welcomeLayer.parentElement.removeChild(this.welcomeLayer)
  }

  _setEvents() {

    document.querySelector('[name=modisLink]').addEventListener('click', () => {
      chrome.tabs.create({ url: event.target.href })
    }, false)

    document.querySelector('[name=adeccoLink]').addEventListener('click', () => {
      chrome.tabs.create({ url: event.target.href })
    }, false)

    document.querySelector('[name=scan]').addEventListener('click', () => {
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
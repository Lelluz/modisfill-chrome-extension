document.addEventListener('DOMContentLoaded', () => {

    //const bg = chrome.extension.getBackgroundPage()

    document.querySelector('.button.scan').addEventListener('click', () => {
        chrome.tabs.query({currentWindow: true, active: true},
        tabs => {
            chrome.tabs.sendMessage(tabs[0].id, 'scan button click', manageOverlays)
        })
    }, false)

    const manageOverlays = result => {

        if(result.valid) {

            const welcomeOverlay = document.querySelector('.welcomeOverlay')
            welcomeOverlay.parentElement.removeChild(welcomeOverlay);

            const template = document.createElement('div')
            template.textContent = `${result.name} ${result.surname}`
            document.body.appendChild(template)

        }
    }
    
}, false)
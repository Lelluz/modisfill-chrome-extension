document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.button.scan').addEventListener('click', () => {
        chrome.tabs.query({ currentWindow: true, active: true },
            tabs => {
                chrome.tabs.sendMessage(tabs[0].id, 'scan button click', manageOverlays)
            })
    }, false)

    const manageOverlays = result => {

        if (result) {

            const mainWrapper = document.querySelector('#main')

            const welcomeOverlay = mainWrapper.querySelector('.welcomeOverlay')
            welcomeOverlay.parentElement.removeChild(welcomeOverlay)

            const wtcTemplate = `
            //custom template
            `
            mainWrapper.insertAdjacentHTML('beforeend', wtcTemplate)

        }
    }

}, false)
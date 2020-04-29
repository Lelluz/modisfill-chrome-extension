import DataLoader from './components/DataLoader.js'
import FieldsColumns from './components/FieldsColumns.js'
import DaysColumn from './components/DaysColumn.js'
import WelcomeLayer from './components/WelcomeLayer.js'
import TableLayer from './components/TableLayer.js'
import HoursDisableer from './components/HoursDisableer.js'

(async function () {

    const json = chrome.extension.getURL('data.json'),
        data = await DataLoader.loadData(json)

    return data

})().then(data => {

    //Refactor the chrome.storage.sync, remove it from components and get the custom data from google sync after the default data.json
    //After that move the two method calls below after the TableLayer initialization
    FieldsColumns.createColumnsFields(data.fieldsColumns)
    DaysColumn.createDays(data.daysColumn)

    WelcomeLayer.init()

    let welcomeLayerInDom = document.body.contains(WelcomeLayer.welcomeLayer)

    const welcomeLayerObserver = new MutationObserver(mutations => {

        if (welcomeLayerInDom) {
            welcomeLayerInDom = false
            TableLayer.init(FieldsColumns, DaysColumn)
            HoursDisableer.init()
        }
    })
    welcomeLayerObserver.observe(WelcomeLayer.mainLayer, { childList: true })
})

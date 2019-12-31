import FieldsColumns from './components/FieldsColumns.js'
import DaysColumn from './components/DaysColumn.js'
import WelcomeLayer from './components/WelcomeLayer.js'
import TableLayer from './components/TableLayer.js'
import HoursDisableer from './components/HoursDisableer.js'

WelcomeLayer.init()

let welcomeLayerInDom = document.body.contains(WelcomeLayer.welcomeLayer)

const welcomeLayerObserver = new MutationObserver(async mutations => {

    if (welcomeLayerInDom) {
        welcomeLayerInDom = false

        let response = await fetch(chrome.extension.getURL('data.json'))
        const data = JSON.parse(JSON.stringify(await response.json()))

        FieldsColumns.createColumnsFields(data.fieldsColumns)
        DaysColumn.createDays(data.daysColumn)

        TableLayer.init(FieldsColumns, DaysColumn)

        HoursDisableer.init()

    }
})
welcomeLayerObserver.observe(WelcomeLayer.mainLayer, { childList: true })

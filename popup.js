import FieldsColumns from './components/FieldsColumns.js'
import DaysColumn from './components/DaysColumn.js'
import WelcomeLayer from './components/WelcomeLayer.js'
import TableLayer from './components/TableLayer.js'

WelcomeLayer.init()

let welcomeLayerInDom = document.body.contains(WelcomeLayer.welcomeLayer)
const welcomeLayerObserver = new MutationObserver(mutations => {

    if (welcomeLayerInDom) {

        welcomeLayerInDom = false

        FieldsColumns.createColumnsFields([
            {
                keyValueName: 'modisfill_entry1_value',
                keyEnabledName: 'modisfill_entry1_enabled',
                value: '',
                enabled: true,
                selector: 'input[id$="_1"]:not([disabled])',
                labelName: 'Entry 1'
            },
            {
                keyValueName: 'modisfill_exit1_value',
                keyEnabledName: 'modisfill_exit1_enabled',
                value: '',
                enabled: true,
                selector: 'input[id$="_2"]:not([disabled])',
                labelName: 'Exit 1'
            },
            {
                keyValueName: 'modisfill_entry2_value',
                keyEnabledName: 'modisfill_entry2_enabled',
                value: '',
                enabled: true,
                selector: 'input[id$="_3"]:not([disabled])',
                labelName: 'Entry 2'
            },
            {
                keyValueName: 'modisfill_exit2_value',
                keyEnabledName: 'modisfill_exit2_enabled',
                value: '',
                enabled: true,
                selector: 'input[id$="_4"]:not([disabled])',
                labelName: 'Exit 2'
            },
            {
                keyValueName: 'modisfill_entry3_value',
                keyEnabledName: 'modisfill_entry3_enabled',
                value: '',
                enabled: false,
                selector: 'input[id$="_5"]:not([disabled])',
                labelName: 'Entry 3'
            },
            {
                keyValueName: 'modisfill_exit3_value',
                keyEnabledName: 'modisfill_exit3_enabled',
                value: '',
                enabled: false,
                selector: 'input[id$="_6"]:not([disabled])',
                labelName: 'Exit 3'
            },
            {
                keyValueName: 'modisfill_entry4_value',
                keyEnabledName: 'modisfill_entry4_enabled',
                value: '',
                enabled: false,
                selector: 'input[id$="_7"]:not([disabled])',
                labelName: 'Entry 4'
            },
            {
                keyValueName: 'modisfill_exit4_value',
                keyEnabledName: 'modisfill_exit4_enabled',
                value: '',
                enabled: false,
                selector: 'input[id$="_8"]:not([disabled])',
                labelName: 'Exit 4'
            }
        ])

        DaysColumn.createDays(
            [
                {
                    id: 0,
                    keyEnabledName: 'modisfill_monday',
                    enabled: true,
                    labelName: 'Monday'
                },
                {
                    id: 1,
                    keyEnabledName: 'modisfill_tuesday',
                    enabled: true,
                    labelName: 'Tuesday'
                },
                {
                    id: 2,
                    keyEnabledName: 'modisfill_wednesday',
                    enabled: true,
                    labelName: 'Wednesday'
                },
                {
                    id: 3,
                    keyEnabledName: 'modisfill_thursday',
                    enabled: true,
                    labelName: 'Thursday'
                },
                {
                    id: 4,
                    keyEnabledName: 'modisfill_friday',
                    enabled: true,
                    labelName: 'Friday'
                },
                {
                    id: 5,
                    keyEnabledName: 'modisfill_saturday',
                    enabled: false,
                    labelName: 'Saturday'
                },
                {
                    id: 6,
                    keyEnabledName: 'modisfill_sunday',
                    enabled: false,
                    labelName: 'Sunday'
                }
            ]
        )

        FieldsColumns.loadUserData()
        DaysColumn.loadUserData()

        TableLayer.init(FieldsColumns, DaysColumn)

    }
})
welcomeLayerObserver.observe(WelcomeLayer.mainLayer, { childList: true })


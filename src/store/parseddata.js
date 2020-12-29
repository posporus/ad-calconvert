import _ from 'lodash'

function getDefaultState() {
    return {
        pdfDataUrl:"",
        rawData:[],
        cleanData: [],
        dayChunks: [],
        slectedAs: null,
        calendar: [],
    }
}

export default {
    
    namespaced: true,
    state: getDefaultState(),
    getters: {
        isValid: state => {
            console.log(state.rawData[0])
            if(state.rawData[0][0] === "Soll-Einsatzplan") {
                return true
            }
            else return false
        },
        asn: state => {
            if(state.rawData.length !== 0) return state.rawData[0][2]
            else return false
        },
        monthYear: state => {
            if(state.rawData.length !== 0) return state.rawData[0][4]
            else return false
        },
        selectedAs: state => {
            console.log("ASASAS:"+state.slectedAs)
            if(state.slectedAs) return state.slectedAs
            else return false
        },
        month: state => {
            if(state.rawData.length === 0) return false
            switch(state.rawData[0][4].split(' ')[0]) {
                case "Januar":
                    return 1
                case "Februar":
                    return 2
                case "März":
                    return 3
                case "April":
                    return 4
                case "Mai":
                    return 5
                case "Juni":
                    return 6
                case "Juli":
                    return 7
                case "August":
                    return 8
                case "September":
                    return 9
                case "Oktober":
                    return 10
                case "November":
                    return 11
                case "Dezember":
                    return 12
                default:
                    return false
            }
            //return state.rawData[0][4].split(' ')[0]
        },
        year: state => {
            if(state.rawData.length !== 0) return state.rawData[0][4].split(' ')[1]
            else return false
        },
        assis: state => {
            if(state.cleanData.length !== 0) {
                let names = []
                //let followDetect = 0
                state.cleanData.forEach(element => {
                    //followDetect++
                    //console.log('followDetect: ', followDetect, 'element: ', element)
                    if(!/\d/.test(element) && _.indexOf(['Mo','Di','Mi','Do','Fr','Sa','So'],element) === -1 && element !== '.'/* && followDetect < 1*/){
                        //followDetect = 0
                        if(names.indexOf(element) < 0){
                            names.push(element)
                        }
                        
                    }
                    
                    
                })
                return names
            }
            else return false
            
        },
        calendar: state => {
            return state.calendar
        },
        dayChunks: state => {
            return state.dayChunks
        },
        pdfDataUrl: state => {
            return state.pdfDataUrl
        }
    },
    mutations: {
        reset(state) {
            //state.pdfDataUrl = ""
            _.remove(state.rawData)
            _.remove(state.cleanData)
            _.remove(state.dayChunks)
            state.slectedAs = null
            _.remove(state.calendar)
            
        },
        addData(state,data) {
            state.rawData.push(data)
        },
        addCleanData(state,data) {
            data.forEach(element => {
                if(
                    element !== "Gesamt:" &&
                    element !== "Alle im Plan aufgeführten AssistentInnen haben" &&
                    element !== "die Basisqualifizierung der ad absolviert" &&
                    element !== "erstellt am:" &&
                    element !== "Unterschrift" &&
                    element !== "von:"
                ) {
                    state.cleanData.push(element)
                }
            });
        },
        setAs(state,as) {
            console.log("selected AS: "+ as)
            state.slectedAs = as
        },
        setCalendar(state, calendar) {
            console.log('setCalendar')
            state.calendar = calendar
        },
        setDayChunks(state, dayChunks) {
            state.dayChunks = dayChunks
        },
        setPdfDataUrl(state, pdfDataUrl) {
            state.pdfDataUrl = pdfDataUrl
        }
    },
    actions: {
        reset(context) {
            context.commit('reset')
        },
        setPdfDataUrl(context, pdfDataUrl) {
            context.commit('setPdfDataUrl', pdfDataUrl)
            /*
            return new Promise((resolve,reject) => {

            })
            context.commit('setPdfDataUrl', pdfDataUrl)
            */
        },
        setAs(context, as) {
            /*
            set Assistand and extract according data
            */
            context.commit('setAs', as)
            console.log(context.state.dayChunks)

            let shifts = []
            context.state.dayChunks.forEach((element, dayInd) => {
                
                element.forEach((mentele, index) => {
                    if(mentele === as) {
                        console.log("day: ",dayInd+1,"start:",element[index-2],"end:",element[index-1])
                        let comment = ""
                        if(element[index+1].split(':').length === 1) {
                            comment = element[index+1]
                        }
                        shifts.push({
                            day: dayInd+1,
                            month: context.getters.month,
                            year: context.getters.year,
                            start: element[index-2],
                            end: element[index-1],
                            comment: comment
                        })
                    }
                })
            })
            console.log('Month: '+context.getters.month)
            context.commit('setCalendar',shifts)
        },
        addData(context, data) {
            context.commit('addData',data)
        },
        straighten(context){
            return context.dispatch('toDayChunks').then((dayChunks) => {
                context.commit('setDayChunks', dayChunks)
                return dayChunks
            })
        },
        toDayChunks(context) {
            return new Promise((resolve) => {
                context.state.rawData.forEach(element => {
                    context.commit('addCleanData',_.drop(element,15))
                });
    
                let dayChunks = []
                let dayIndex = -1
                context.state.cleanData.forEach(element => {
                    
                    if(_.indexOf(['Mo','Di','Mi','Do','Fr','Sa','So'],element) != -1){
                        dayIndex++
                        dayChunks[dayIndex] = []
                    }
                    else {
                        if(element != '.'){                      
                            dayChunks[dayIndex].push(element)
                        }
                    }
                    
                })
                resolve(dayChunks)
            })
        },
    }
}
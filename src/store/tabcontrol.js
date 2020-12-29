//import _ from 'lodash'
export default {
    namespaced: true,
    state: {
        currentTab:0,
        chooseDisabled: true,
        checkDisabled: true,
    },
    mutations: {
        setCurrentTab(state, tab) {
            state.currentTab = tab
        },
        setChooseDisabled(state, disabled) {
            state.chooseDisabled = disabled
        },
        setCheckDisabled(state, disabled) {
            state.checkDisabled = disabled
        },
    },
    actions: {
        jumpToTab(context, tab) {
            context.commit('setCurrentTab', tab)
            console.log("jumpToTab", tab)
        },
        
        /*
        lockTab(context, tab) {
            context.commit('lockTab', tab)
        },
        unlockTab(context, tab) {
            context.commit('unlockTab', tab)
            /*
            console.log("unlockTab", context.state.disabledTabs)
            return new Promise(resolve => {
                
                
                window.setTimeout(() => {
                    resolve()
                },3000)
            })
            
        },*/
        
    }
}
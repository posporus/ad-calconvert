export default {
    namespaced: true,
    state: {
        message: "",
        show : false
    },
    mutations: {
        showAlert(state, message){
            state.message = message
            state.show = true
        },
        hide(state) {
            state.show = false
        }
    }
}
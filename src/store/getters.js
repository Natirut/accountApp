//Getters เอาไว้ get ค่า state ออกมา
export const getters = {
    appTitle(state) {
        return state.appName
    },
    getUser(state) {
        return state.user
    },
    getEmail(state) {
        return state.mail
    },
    getError(state) {
        return state.error
    },
    getLoading(state) {
        return state.loading
    }
}

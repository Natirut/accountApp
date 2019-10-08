// import Vue , Vuex และส่วนต่างๆของ store และใช้บอก Vue ให้ใช้ Vuex และทำการ export store 
import Vue from 'vue'
import Vuex from 'vuex'

import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
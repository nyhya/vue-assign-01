import Vue from 'vue';
import Vuex from 'vuex';
import {
	apiGetCityList,
	apiGetMiddleList,
	apiGetTownList,
	apiGetSpaceList,
} from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userName: 'nyh',
		addressCityArray: [],
		addressMiddleArray: [],
		addressTownArray: [],
		addressCitySelect: { level: -1, addressId: -1 },
		addressCityMiddleSelect: { level: -1, addressId: -1 },
		addressCityTownSelect: { level: -1, addressId: -1 },
		spaceStructureList: [],
	},
	getters: {
		isLogin(state) {
			return state.userName;
		},
		cityList(state) {
			return state.addressCityArray;
		},
		middleCityList(state) {
			return state.addressMiddleArray;
		},
		townList(state) {
			return state.addressTownArray;
		},
		spaceList(state) {
			return state.spaceStructureList;
		},
		activeCitySelect(state) {
			return state.addressCitySelect.level;
		},
		activeMiddleSelect(state) {
			return state.addressCityMiddleSelect.level;
		},
		activeTownSelect(state) {
			return state.addressCityTownSelect.level;
		},
	},

	mutations: {
		setAddressCityList(state, list) {
			state.addressCityArray = list;
		},
		setAddressMiddleList(state, list) {
			state.addressMiddleArray = list;
		},
		setAddressTownArray(state, list) {
			state.addressTownArray = list;
		},
		setAddressCitySelect(state, level) {
			state.addressCitySelect.level = level;
			// state.addressCityMiddleSelect = addressId;
		},
		setAddressCityMiddleSelect(state, level) {
			state.addressCityMiddleSelect.level = level;
			// state.addressCityMiddleSelect = addressId;
		},
		setAddressCityTownSelect(state, level) {
			state.addressCityTownSelect.level = level;
			// state.addressCityTownSelect = addressId;
		},
		setSpaceStructure(state, spaceList) {
			spaceList.forEach(item => {
				state.spaceStructureList = [
					...state.spaceStructureList,
					{ description: item.description, active: false },
				];
			});
		},
		setSpaceActiveSelect(state, select) {
			state.spaceStructureList.forEach(item => {
				item.active = false;
			});
			state.spaceStructureList[select].active = true;
		},
	},
	actions: {
		async GETCITYLIST({ commit }) {
			try {
				const { data } = await apiGetCityList();
				commit('setAddressCityList', data.content);
			} catch (error) {
				console.log(error);
			}
		},
		async GETMIDDLECITYLIST({ commit }, value) {
			try {
				const { data } = await apiGetMiddleList(2, value);
				commit('setAddressMiddleList', data.content);
			} catch (error) {
				console.log(error);
			}
		},
		async GETTOWNLIST({ commit }, value) {
			try {
				const { data } = await apiGetTownList(3, value);
				commit('setAddressTownArray', data.content);
			} catch (error) {
				console.log(error);
			}
		},
		async GETSPACE({ commit }) {
			try {
				const { data } = await apiGetSpaceList();
				commit('setSpaceStructure', data.content);
			} catch (error) {
				console.log(error);
			}
		},
	},
});

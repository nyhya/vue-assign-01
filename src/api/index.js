import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

function apiGetCityList() {
	return instance.get('address/city');
}

function apiGetMiddleList(level, addressId) {
	return instance.get(
		`address/children?level=${level}&pAddressId=${addressId}`,
	);
}

function apiGetTownList(level, addressId) {
	return instance.get(
		`address/children?level=${level}&pAddressId=${addressId}`,
	);
}

function apiGetSpaceList() {
	return instance.get(`code/getCodeList?commonCodeType=HOUSE_STRUCTURE`);
}

function apiPostUserData(userData) {
	return instance.post('/location/request', userData);
}

export {
	apiGetCityList,
	apiGetMiddleList,
	apiGetTownList,
	apiGetSpaceList,
	apiPostUserData,
};

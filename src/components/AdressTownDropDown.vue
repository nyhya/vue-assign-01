<template>
	<div class="drop-contain">
		<select
			ref="town"
			name="twon"
			class="select"
			:disabled="list.length == 0"
			:value="value"
			@change="onClicSelectOption"
		>
			<option value="" disabled selected>읍/면/동</option>
			<option v-for="(city, idx) in list" :key="idx" :value="city.addressId">
				{{ city.addressName }}
			</option>
		</select>
	</div>
</template>
<script>
export default {
	name: 'drop-menu',
	data() {
		return {
			value: '',
		};
	},
	computed: {
		list() {
			return this.$store.getters.townList;
		},
		middleList() {
			return this.$store.getters.middleCityList;
		},
	},
	watch: {
		middleList: function () {
			this.$refs['town'].value = '';
		},
	},
	methods: {
		onClicSelectOption(event) {
			console.log('town', event);
			this.$store.commit('setAddressCityTownSelect', 1);
		},
	},
};
</script>

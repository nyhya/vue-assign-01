<template>
	<div class="drop-contain">
		<select
			name="city"
			class="select"
			@change="onClicSelectOption"
			:disabled="list.length == 0"
		>
			<option value="" disabled selected>시/도</option>
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
		return {};
	},
	created() {
		// console.log('s');
	},
	computed: {
		list() {
			return this.$store.getters.cityList;
		},
	},

	methods: {
		async onClicSelectOption(event) {
			if (event.target.value.length > 0) {
				try {
					this.$store.dispatch('GETMIDDLECITYLIST', event.target.value);
					this.$store.commit('setAddressCitySelect', 1);
					this.$store.commit('setAddressCityMiddleSelect', 0);
					this.$store.commit('setAddressCityTownSelect', 0);
				} catch (error) {
					console.log(error);
				}
			}
		},
	},
};
</script>

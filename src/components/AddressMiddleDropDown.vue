<template>
	<div class="drop-contain">
		<select
			name="middle"
			class="select"
			:disabled="list.length == 0"
			:value="value"
			@change="onClicSelectOption"
		>
			<option value="" disabled selected>시/군/구</option>
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
			return this.$store.getters.middleCityList;
		},
	},
	watch: {
		list: function () {
			this.value = '';
		},
	},
	methods: {
		async onClicSelectOption(event) {
			console.log('town', event.target.value);
			if (event.target.value.length > 0) {
				try {
					this.$store.dispatch('GETTOWNLIST', event.target.value);
					this.$store.commit('setAddressCityMiddleSelect', 1);
					this.$store.commit('setAddressCityTownSelect', 0);
				} catch (error) {
					console.log(error);
				}
			}
		},
	},
};
</script>

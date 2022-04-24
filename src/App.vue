<template>
	<div id="app">
		<div class="contain">
			<div class="img"></div>
			<!-- 드롭박스 : s -->
			<address-dropdown></address-dropdown>
			<middle-dropdown></middle-dropdown>
			<town-dropdown></town-dropdown>
			<!-- 드롭박스 : e -->
			<!-- 공간구조 : s -->

			<space-structure />
			<!-- 공간구조 : e -->
			<!-- 슬라이드 : s -->
			<div class="slider">
				<p class="squareText">
					{{ squareFeetValue[0] }}평 ~ {{ squareFeetValue[1] }}평
				</p>
				<vue-slider
					ref="slider"
					v-model="squareFeetValue"
					:marks="squareFeetMarks"
					:tooltip="'none'"
					:process="squareFeetProcess"
					:min="1"
					:max="40"
				></vue-slider>
				<!-- <vue-slider ref="slider" v-model="monthlyRentValue"></vue-slider> -->
			</div>
			<!-- 슬라이드 : e -->
			<div class="user">
				<label for="name">이름(선택)</label>
				<input type="text" id="name" name="name" placeholder="정규직" />
			</div>
			<button :class="{ active: checkSelectList }" @click="onClickUserInfo()">
				완료
			</button>
		</div>
	</div>
</template>

<script>
import { apiPostUserData } from '@/api/index';
import AddressDropDown from '@/components/AddressDropDown.vue';
import AddressMiddleDropDown from '@/components/AddressMiddleDropDown.vue';
import AdressTownDropDown from '@/components/AdressTownDropDown.vue';
import SpaceStructure from '@/components/SpaceStructure.vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

export default {
	name: 'App',
	components: {
		'address-dropdown': AddressDropDown,
		'middle-dropdown': AddressMiddleDropDown,
		'town-dropdown': AdressTownDropDown,
		'space-structure': SpaceStructure,

		VueSlider,
	},
	data() {
		return {
			squareFeetProcess: dotsPos => [
				[dotsPos[0], dotsPos[1], { backgroundColor: 'rgba(154, 138, 248, 1)' }],
			],
			squareFeetValue: [1, 40],
			squareFeetMarks: {
				1: '1평',
				10: '10평',
				20: '20평',
				30: '30평',
				40: '40평',
			},

			// monthlyRentOptions: {
			// 	dotSize: 14,
			// 	width: 'auto',
			// 	height: 4,
			// 	contained: false,
			// 	direction: 'ltr',
			// 	data: null,
			// 	min: 1,
			// 	max: 250,
			// 	interval: 5,
			// 	disabled: false,
			// 	clickable: true,
			// 	duration: 0.5,
			// 	adsorb: false,
			// 	lazy: false,
			// 	tooltip: 'active',
			// 	tooltipPlacement: 'top',
			// 	tooltipFormatter: void 0,
			// 	useKeyboard: false,
			// 	keydownHook: null,
			// 	dragOnClick: false,
			// 	enableCross: true,
			// 	fixed: false,
			// 	minRange: void 0,
			// 	maxRange: void 0,
			// 	order: true,
			// 	marks: false,
			// 	dotOptions: void 0,
			// 	process: true,
			// 	dotStyle: void 0,
			// 	railStyle: void 0,
			// 	processStyle: void 0,
			// 	tooltipStyle: void 0,
			// 	stepStyle: void 0,
			// 	stepActiveStyle: void 0,
			// 	labelStyle: void 0,
			// 	labelActiveStyle: void 0,
			// },
		};
	},
	computed: {
		checkSelectList() {
			console.log(
				this.$store.getters.activeCitySelect,
				this.$store.getters.activeMiddleSelect,
				this.$store.getters.activeTownSelect,
			);
			if (
				this.$store.getters.activeCitySelect > 0 &&
				this.$store.getters.activeMiddleSelect > 0 &&
				this.$store.getters.activeTownSelect > 0
			) {
				return true;
			} else {
				return false;
			}
		},
	},
	// watch() {},
	created() {
		try {
			this.$store.dispatch('GETCITYLIST');
		} catch (error) {
			console.log(error);
		}
	},
	methods: {
		async onClickUserInfo() {
			const userData = {
				addressId: 3,
				agreePersonalInfo: true,
				amountFrom: 500,
				amountTo: 10000,
				areaFrom: 10,
				areaTo: 20,
				houseStructures: [4001, 4002],
				userEmail: 'string',
				userName: 'string',
				userPhone: 'string',
			};
			if (this.checkSelectList) {
				try {
					const { data } = await apiPostUserData(userData);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			}
		},
	},
};
</script>

<style>
#app {
	position: relative;
	width: 100%;
	height: 100%;
}

#app .contain {
	width: 100%;
	height: calc(100% - 50px);
	overflow-y: scroll;
}
.squareText {
	text-align: right;
	font-weight: 600;
	letter-spacing: -1px;
	padding-bottom: 10px;
	color: rgba(154, 138, 248, 1);
}
.slider {
	/* overwrite slider styles */
	padding: 20px;
}

#app .img {
	width: 100%;
	height: 350px;
	background-image: url(@/assets/capture.png);
	background-repeat: no-repeat;
	background-position: center center;
	background-size: auto 100%;
}

select::-ms-expand {
	display: none;
}

.drop-contain {
	padding: 15px;
}

.select {
	-o-appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	width: 100%;
	height: 35px;
	background: url(@/assets/ico-arrow.png) calc(100% - 5px) center no-repeat;
	background-size: 15px;
	padding: 5px 30px 5px 10px;
	border-radius: 4px;
	outline: 0 none;
	border: 1px #ddd solid;
}
.select option {
	background: white;
	color: #222;
	padding: 3px 0;
}
select option[value=''][disabled] {
	display: none;
}

.user {
	position: relative;
	padding: 10px;
	margin-top: 30px;
}
.user label {
	display: block;
	margin-bottom: 10px;
}
.user input {
	box-sizing: border-box;
	width: 100%;
	height: 50px;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}

button {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 50px;
	background-color: #eee;
	color: #ddd;
	border: 0;
}

button.active {
	background-color: #222;
	color: white;
}
</style>

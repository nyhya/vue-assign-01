<template>
	<div class="space-structure">
		<div class="space">
			<p>공간구조(선택)</p>
		</div>
		<ul>
			<li
				v-for="(space, idx) in list"
				:key="idx"
				:class="{ active: space.active }"
				@click="onClicActive(idx)"
			>
				{{ space.description }}
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'drop-menu',
	data() {
		return {
			isActive: false,
		};
	},
	created() {
		this.$store.dispatch('GETSPACE');
	},
	computed: {
		list() {
			return this.$store.getters.spaceList;
		},
	},

	methods: {
		onClicActive(select) {
			this.$store.commit('setSpaceActiveSelect', select);
		},
	},
};
</script>

<style scoped>
.space-structure li.active {
	background-color: rgba(154, 138, 248, 1);
	color: white;
}
.space-structure {
	position: relative;
}

.space-structure p {
	padding: 0px 15px;
	margin-bottom: 15px;
}

.space-structure ul {
	position: relative;
	width: 100%;
	height: 50px;
	white-space: nowrap;
	overflow-x: scroll;
	padding-bottom: 15px;
}

.space-structure li {
	display: inline-block;
	border-radius: 40px;
	padding: 10px 20px;
	color: #222;
	background-color: #eee;
	margin-right: 15px;
}

.space-structure li:first-child {
	margin-left: 15px;
}

.space-structure li:last-child {
	margin-right: 15px;
}
</style>

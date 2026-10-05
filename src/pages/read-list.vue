<template>
	<uni-view class="content">
        <uni-view class="table-view">
            <uni-view class="table-cell" v-for="(item, index) in informations" :key="index"
                @click="tableClick(item)">
                <uni-view class="sentiment-view positive-sentiment" v-if="item.sentiment === '正面'">正面报道</uni-view>
                <uni-view class="sentiment-view negative-sentiment" v-else-if="item.sentiment === '负面'">敏感报道</uni-view>
                <uni-view class="sentiment-view" v-else-if="item.sentiment === '中性'">中性报道</uni-view>
                <uni-text class="title">{{ item.title }}</uni-text>
            </uni-view>
        </uni-view>
    </uni-view>
</template>

<script setup>
const informations = ref([])

onMounted(async () => {
	// 获取localStorage中的readList
	let readList = localStorage.getItem('readList');
	readList = JSON.parse(readList);
	informations.value = readList?.data || [];
});

const router = useRouter();
const tableClick = (item) => {
	// 跳转页面
	router.push({
		name: 'detail',
		query: {
			id: item.id
		}
	});
};
</script>

<style lang="scss" scoped>
.content .table-view {
	padding: 20px;
	display: flex;
	flex-direction: column;
}

.content .table-view .table-cell {
	margin-bottom: 15px;
	padding: 20px;
	display: flex;
	background: white;
	box-shadow: 0px 4px 20px 1px rgba(25, 54, 125, 0.14);
	border-radius: 10px;
}

.content .table-view .table-cell .sentiment-view {
	margin-top: 1px;
	width: 70px;
	height: 27px;
	color: #08C4AE;
	font-size: 12px;
	text-align: center;
	line-height: 27px;
	background: rgba(8, 196, 174, 0.1);
	border-radius: 5px;
}

.content .table-view .table-cell .positive-sentiment {
	color: #3491FA;
	background: rgba(52, 145, 250, 0.1);
}

.content .table-view .table-cell .negative-sentiment {
	color: #8B90F2;
	background: rgba(148, 153, 253, 0.1);
}

.content .table-view .table-cell .title {
	margin-left: 10px;
	flex: 1;
	color: black;
	font-size: 20px;
	font-weight: bold;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
</style>
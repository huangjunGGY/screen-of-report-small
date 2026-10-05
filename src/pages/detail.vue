<template>
	<uni-view class="content">
		<div class="sentiment-view positive-sentiment" v-if="detail.sentiment == '正面'">正面报道</div>
		<div class="sentiment-view negative-sentiment" v-else-if="detail.sentiment == '负面'">敏感报道</div>
		<div class="sentiment-view " v-else-if="detail.sentiment == '中性'">中性报道</div>
		<span class="publisher-text">{{ detail.sourceReference }}</span>
		<span class="information-title">{{ detail.title }}</span>
		<span class="information-content" v-html="detail.content"></span>
		<uni-view style="height: 126px;"></uni-view>
		<uni-view class="bottom-view">
			<uni-view class="operation-view">
				<uni-view class="read-view" @click="readClick">
					<img class="image" src="/image/detail/add-read.png" v-if="!isRead" />
					<img class="image" src="/image/detail/remove-read.png" v-else />
					<uni-text class="text" v-if="!isRead">添加至阅读列表</uni-text>
					<uni-text class="text" v-else>从阅读列表移除</uni-text>
				</uni-view>
				<uni-view class="collect-view" @click="collectClick">
					<img class="image" src="/image/detail/add-collect.png" v-if="!isCollect" />
					<img class="image" src="/image/detail/remove-collect.png" v-else />
					<uni-text class="text" v-if="!isCollect">添加收藏</uni-text>
					<uni-text class="text" v-else>取消收藏</uni-text>
				</uni-view>
			</uni-view>
			<uni-view class="button" @click="buttonClick">派发任务</uni-view>
		</uni-view>
		<uni-movable-area class="movable-area">
			<uni-movable-view class="movable-view"
				style="transform-origin: center center; transform: translateX(0px) translateY(0px) translateZ(0px) scale(1); will-change: auto;"
				@click="movableClick">
				<uni-image class="image">
					<div
						style="background-image: url(&quot;/image/detail/read-list.png&quot;); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;">
					</div><img src="/image/detail/read-list.png" draggable="false">
				</uni-image>
			</uni-movable-view>
		</uni-movable-area>
	</uni-view>
</template>

<script setup>

const api = inject('api');

const route = useRoute();

const detail = ref({});

const isRead = ref(false);

const isCollect = ref(false);

const readClick = () => {
	let readList = localStorage.getItem('readList');
	readList = JSON.parse(readList);
	if (isRead.value) {
		isRead.value = false;

		// 从localStorage的readList中移除
		if (readList?.data) {
			readList.data = readList.data.filter(item => item.id !== detail.value.id);
		}
	} else {
		isRead.value = true;

		// 存储到localStorage的readList中
		if (!readList?.data) {
			readList = {
				type: "object",
				data: []
			};
		}
		readList.data.push(detail.value);
	}
	localStorage.setItem('readList', JSON.stringify(readList));
};

const collectClick = () => {
	let collectList = localStorage.getItem('collectList');
	collectList = JSON.parse(collectList);

	if (isCollect.value) {
		isCollect.value = false;

		// 从localStorage的collectList中移除
		if (collectList.data) {
			collectList.data = collectList.data.filter(item => item.id !== detail.value.id);
		}
	} else {
		isCollect.value = true;

		// 存储到localStorage的collectList中
		if (!collectList.data) {
			collectList = {
				type: "object",
				data: []
			};
		}
		collectList.data.push(detail.value);
	}
	localStorage.setItem('collectList', JSON.stringify(collectList));
};

const buttonClick = () => {
	console.log('buttonClick');
};

const router = useRouter();
const movableClick = () => {
	router.push('/read-list');
};

onMounted(async () => {
	const { data } = await api.getdetail(route.query.id);
	detail.value = data;

	let collectList = localStorage.getItem('collectList');
	collectList = JSON.parse(collectList);
	if (collectList?.data) {
		isCollect.value = collectList.data.some(item => item.id === data.id);
	}

	let readList = localStorage.getItem('readList');
	readList = JSON.parse(readList);
	if (readList?.data) {
		isRead.value = readList.data.some(item => item.id === data.id);
	}
});
</script>

<style lang="scss" scoped>
.content {
	padding: 30px;
	display: flex;
	flex-direction: column;
}

.content .sentiment-view {
	width: 70px;
	height: 27px;
	color: #08C4AE;
	font-size: 12px;
	text-align: center;
	line-height: 27px;
	background: rgba(8, 196, 174, 0.1);
	border-radius: 5px;
}

.content .positive-sentiment {
	color: #3491FA;
	background: rgba(52, 145, 250, 0.1);
}

.content .negative-sentiment {
	color: #8B90F2;
	background: rgba(148, 153, 253, 0.1);
}

.content .publisher-text {
	margin-top: 10px;
	color: #AAAAAA;
	font-size: 15px;
}

.content .information-title {
	margin-top: 10px;
	color: black;
	font-size: 29px;
	font-weight: bold;
	line-height: 38px;
}

.content .information-content {
	margin-top: 30px;
	color: black;
	font-size: 22px;
	line-height: 38px;
}

.content .source {
	margin-top: 20px;
	color: #AAAAAA;
	font-size: 17px;
	text-align: right;
}

.content .bottom-view {
	padding: 0 30px;
	height: 86px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: white;
	box-shadow: 0px 4px 20px 1px rgba(136, 136, 136, 0.2);
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}

.content .bottom-view .operation-view {
	display: flex;
}

.content .bottom-view .operation-view .read-view {
	display: flex;
	align-items: center;
}

.content .bottom-view .operation-view .read-view .image {
	width: 20px;
	height: 20px;
}

.content .bottom-view .operation-view .read-view .text {
	margin-left: 10px;
	color: black;
	font-size: 17px;
}

.content .bottom-view .operation-view .collect-view {
	margin-left: 20px;
	display: flex;
	align-items: center;
}

.content .bottom-view .operation-view .collect-view .image {
	width: 20px;
	height: 22px;
}

.content .bottom-view .operation-view .collect-view .text {
	margin-left: 10px;
	color: black;
	font-size: 17px;
}

.content .bottom-view .button {
	width: 111px;
	height: 45px;
	color: white;
	font-size: 17px;
	font-weight: bold;
	text-align: center;
	line-height: 45px;
	background: linear-gradient(126deg, #A4F651 0%, #4FEFD4 100%);
	border-radius: 22px;
}

.content .movable-area {
	width: 76px;
	height: auto;
	position: fixed;
	top: 228px;
	bottom: 126px;
	right: 0;
}

.content .movable-area .movable-view {
	width: 76px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: white;
	box-shadow: 0px 4px 12px 1px rgba(25, 54, 125, 0.1);
	border-radius: 25px 0 0 25px;
}

.content .movable-area .movable-view .image {
	margin-left: 7px;
	width: 22px;
	height: 20px;
}
</style>
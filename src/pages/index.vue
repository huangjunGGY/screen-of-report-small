<template>
	<uni-view class="content">
		<uni-view class="home-content"><uni-image class="bg-image" style="height: 456px;">
				<div
					style="background-image: url(&quot;/image/index/home-bg.png&quot;); background-size: 100% 100%; background-repeat: no-repeat;">
				</div><img src="/image/index/home-bg.png" draggable="false">
			</uni-image>
			<uni-view class="top-view">
				<uni-text class="title"><span>大家都在看</span>
				</uni-text>
				<uni-view class="status-view"><uni-image class="clock-image">
						<div
							style="background-image: url(&quot;/image/index/home-clock.png&quot;); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;">
						</div><img src="/image/index/home-clock.png" draggable="false">
					</uni-image>
					<uni-text class="text"><span>每日更新</span>
					</uni-text><uni-image class="download-image">
						<div
							style="background-image: url(&quot;/image/index/home-download.png&quot;); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;">
						</div><img src="/image/index/home-download.png" draggable="false">
					</uni-image>
					<uni-text class="text"><span>可供下载</span>
					</uni-text>
				</uni-view>
			</uni-view>
			<uni-view class="search-view"><uni-image class="search-image">
					<div
						style="background-image: url(&quot;/image/index/home-search.png&quot;); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;">
					</div><img src="/image/index/home-search.png" draggable="false">
				</uni-image>
				<uni-view class="input">
					<div class="uni-input-wrapper">
						<div v-if="ipt === ''" class="uni-input-placeholder placeholder">请输入报刊/关键字
						</div><input maxlength="140" step="" enterkeyhint="done" autocomplete="off" type=""
							class="uni-input-input" v-model="ipt" @keyup.enter="search">
					</div>
				</uni-view>
				<uni-view class="button" @click="search">搜索新闻
				</uni-view>
			</uni-view>

			<!-- 热门 -->
			<uni-view class="latest-information-view" v-if="newsItems.length !== 0" @click="goRemen">
				<uni-view class="header-view">
					<uni-image class="image">
						<div
							style="background-image: url(&quot;/image/index/home-latest-information.png&quot;); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;">
						</div>
						<img src="/image/index/home-latest-information.png" draggable="false" />
					</uni-image>
					<uni-text class="text">
						<span>{{ remen.sourceReference }}</span>
					</uni-text>
				</uni-view>
				<uni-text class="title">
					<span>{{ remen.title }}</span>
				</uni-text>
			</uni-view>


			<!-- 新闻部分 -->
			<uni-view class="empty-view" v-if="newsItems.length === 0">
				<uni-image class="image" style="height: 180px;">
					<div
						style="background-image: url(&quot;/image/index/home-empty1.png&quot;); background-size: 100% 100%; background-repeat: no-repeat;">
					</div>
					<img src="/image/index/home-empty1.png" draggable="false">
				</uni-image>
				<uni-text class="text"><span>今日报道0条</span>
				</uni-text>
			</uni-view>

			<uni-swiper class="swiper" v-else>
				<swiper class="swiper" :space-between="10" slides-per-view="auto" :centered-slides="true"
					:pagination="{ clickable: true }">
					<swiper-slide class="slide" v-for="(item, index) in newsItems" :key="index">
						<uni-swiper-item>
							<uni-view class="information-view is-behind">
								<uni-text class="information-title"><span>{{ item.title }}</span>
								</uni-text>
								<uni-view class="information-content"><uni-image class="information-image">
										<div
											:style="'background-image: url(/ipa1/api/newspaperInfo/fileInfoLocation?filePath=' + item.imgPath + '&category=img); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;'">
										</div>

									</uni-image>
									<uni-text class="information-summary">
										{{ item.summary }}
									</uni-text>
								</uni-view>
								<uni-text class="information-publisher"><span>{{ item.newspaperCategory }}</span>
								</uni-text>
							</uni-view>
						</uni-swiper-item>
					</swiper-slide>
				</swiper>
			</uni-swiper>


			<uni-view class="segment-view">
				<uni-view v-for="(item, index) in segmentItems" :key="index" class="segment-item"
					:class="{ 'segment-item-selected': index === selectedIndex }"
					@click="handleImageClick(index, item)">
					<uni-text class="title">{{ item.label }}
					</uni-text>
					<uni-image class="bg-image">
						<div v-if="index === selectedIndex"
							style="background-image: url(&quot;/image/index/home-segment-bg.png&quot;); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;">
						</div><img :src="item.imageUrl" draggable="false">
					</uni-image>
				</uni-view>
			</uni-view>

			<uni-view class="publisher-view">
				<uni-view v-if="publisherItems.length === 0" class="empty-view"><uni-image class="image"
						style="height: 134px;">
						<div
							style="background-image: url(&quot;/image/index/home-empty2.png&quot;); background-size: 100% 100%; background-repeat: no-repeat;">
						</div>
						<img src="/image/index/home-empty2.png" draggable="false">
					</uni-image>
					<uni-text class="text"><span>敬请期待...</span>
					</uni-text>
				</uni-view>
				<uni-view class="publisher-item" v-else v-for="(item, index) in publisherItems" :key="index"
					v-loading="loading"><uni-image class="publisher-image">
						<div
							:style="'background-image: url(&quot;' + icons[item.label] + '&quot;); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;'">
						</div><img :src="icons[item.label]" draggable="false">
					</uni-image>
					<uni-view class="status-view">
						<uni-view class="type-view">{{ selectedType }}</uni-view>
						<uni-view class="update-view">今日有更新</uni-view>
					</uni-view>
				</uni-view>
			</uni-view>
		</uni-view>
	</uni-view>
</template>

<script setup>
import dayjs from 'dayjs';
import { useUserStore } from '@/stores/userStore';
import { ElLoading } from 'element-plus'
import mloading from '@/components/loading.vue';
import ctdsb from '/image/index/home-publisher-ctdsb.png';
import hbrb from '/image/index/home-publisher-hbrb.png';
import cjsb from '/image/index/home-publisher-cjsb.png';
import cjrb from '/image/index/home-publisher-cjrb.png';
import rmrb from '/image/index/home-publisher-rmrb.png';
import whwb from '/image/index/home-publisher-whwb.png';

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

const startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
const endDate = dayjs().format('YYYY-MM-DD');

const api = inject('api');
console.log(api);

const index = ref(0);
const userStore = useUserStore();
const router = useRouter()


function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const route = useRoute();
if (route.query.code) {
	document.cookie = setCookie('userName',route.query.code, 7);
}


const ipt = ref('');

const gettypes = async () => {
	const { data } = await api.gettypes();
	console.log(data);
	segmentItems.value = [...data];

	handleImageClick(0, data[0]);
};
gettypes();


// 定义 segmentItems 数组，包含每个项目的标题和图片地址
const segmentItems = ref([])

// 定义 selectedIndex 变量，用于跟踪当前选中项的索引
const selectedIndex = ref(0);

// 定义 selectedType 变量，用于跟踪当前选中项的类型
const selectedType = ref('')


const icons = {
	'楚天都市报': ctdsb,
	'湖北日报': hbrb,
	'长江日报': cjrb,
	'长江商报': cjsb,
	'人民日报': rmrb,
	'武汉晚报': whwb,
}

const newsItems = ref([])

const publisherItems = ref([])

const getmtlist = async (value) => {
	const { data } = await api.getmtlist(value);
	console.log(data);
	publisherItems.value = [...data];
};

// 处理图片点击事件，切换选中项
const handleImageClick = (index, item) => {
	selectedIndex.value = index;
	selectedType.value = item.description;

	console.log(item.value);
	getmtlist(item.value)
};

const search = async () => {
	// 页面跳转
	router.push('/search?keyword=' + ipt.value);
};

const loading = ref(true)

const remen = ref([]);
const getremen = async () => {
	const { data } = await api.getlist({
		current: 1,
		size: 1
	}, {
		startDate,
		endDate,
	});
	console.log(data);

	remen.value = data.records[0];

	loading.value = false;
};

const getlist = async () => {
	const { data } = await api.getlist({
		current: 1,
		size: 6
	}, {
		startDate,
		endDate,
	});
	console.log(data);
	newsItems.value = [...data.records];
	loading.value = false;
};

getremen();
getlist();

const goRemen = () => {
	router.push({
		name: 'detail',
		query: {
			id: remen.value.id
		}
	});
};

</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
}

.swiper {
	width: 100%;

	.swiper-slide {
		width: calc(100% - 60px);
	}

	.swiper-slide-active {
		transform: scale(1.05);
		transition: transform 0.5s;
	}
}
</style>
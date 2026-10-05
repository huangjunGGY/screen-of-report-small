<template>

    <uni-view class="content">
        <uni-view class="table-view">
            <uni-view class="table-cell" v-for="(item, index) in list" :key="index">
                <uni-view class="image-view">
                    <uni-image class="image">
                        <div
                            :style="'background-image: url(' + window.location.origin + '/ipa1/api/newspaperInfo/fileInfoLocation?filePath=' + item.imgPath + '&category=img); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;'">
                        </div>
                    </uni-image></uni-view>
                <uni-view class="cell-content">
                    <uni-text class="title">
                        <span>{{item.title}}</span>
                    </uni-text>
                    <uni-view class="status-view">
                        <uni-text class="date-text">
                            <span>{{item.createTime.split(" ")[0]}}发布</span>
                        </uni-text>
                    </uni-view>
                </uni-view>
            </uni-view>
            <uni-view class="u-loadmore"
                style="background-color: transparent; margin-bottom: 10px; margin-top: 10px; height: auto;"><uni-view
                    class="u-loadmore__content u-more">
                    <uni-text class="u-line-1 u-loadmore__content__text"
                        style="color: rgb(96, 98, 102); font-size: 14px; line-height: 14px; background-color: transparent;">
                        <span>没有更多了</span>
                    </uni-text>
                </uni-view>
            </uni-view>
        </uni-view>
    </uni-view>
</template>

<script setup>

import { useRoute } from 'vue-router';

const api = inject('api');

const route = useRoute();

onMounted(() => {
    getsearch();
});

const list = ref([]);

const getsearch = async () => {
    const { data } = await api.search({
        keyword: route.query.keyword,
        sentiment: ""
    });
    console.log(data);
    list.value = data.records;
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
    padding: 15px;
    height: 114px;
    display: flex;
    background: white;
    box-shadow: 0px 4px 20px 1px rgba(25, 54, 125, 0.14);
    border-radius: 10px;
}

.content .table-view .table-cell .image-view {
    width: 154px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #EBEBEB;
    border-radius: 5px;
    overflow: hidden;
}

.content .table-view .table-cell .image-view .image {
    width: 100%;
    height: 100%;
}

.content .table-view .table-cell .image-view .placeholder-image {
    width: 112px;
    height: 32px;
}

.content .table-view .table-cell .cell-content {
    margin-left: 15px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.content .table-view .table-cell .cell-content .title {
    flex: 1;
    color: black;
    font-size: 19px;
    line-height: 27px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.content .table-view .table-cell .cell-content .status-view {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content .table-view .table-cell .cell-content .status-view .date-text {
    color: #888888;
    font-size: 12px;
}

.content .table-view .table-cell .cell-content .status-view .sentiment-view {
    width: 70px;
    height: 22px;
    color: #08C4AE;
    font-size: 12px;
    text-align: center;
    line-height: 22px;
    background: rgba(8, 196, 174, 0.1);
    border-radius: 5px;
}

.content .table-view .table-cell .cell-content .status-view .positive-sentiment {
    color: #3491FA;
    background: rgba(52, 145, 250, 0.1);
}

.content .table-view .table-cell .cell-content .status-view .negative-sentiment {
    color: #8B90F2;
    background: rgba(148, 153, 253, 0.1);
}

.uni-app--showtabbar uni-page-wrapper {
    display: block;
    height: calc(100% - 50px);
}

.uni-app--showtabbar uni-page-wrapper::after {
    content: "";
    display: block;
    width: 100%;
    height: 50px;
}

.uni-app--showtabbar uni-page-head[uni-page-head-type="default"]~uni-page-wrapper {
    height: calc(100% - 44px - 50px);
}
</style>
<template>
    <div v-if="loading" class="loading">
        <!-- 这里放你的加载动画 -->
        <el-icon :color="props.color"><Loading class="loading-icon"/></el-icon>
    </div>
    <slot></slot>
</template>

<script setup>
const props = defineProps({
    loading: Boolean,
    color: {
        type: String,
        default: '#000'
    }
});

const loading = ref(props.loading);

watch(() => props.loading, (val) => {
    loading.value = val;
});

</script>

<style lang="scss" scoped>
.loading {
    position: relative;
}

.loading-icon {
    animation: loading 1s linear infinite;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
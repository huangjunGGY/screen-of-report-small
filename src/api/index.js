import request from "@/request"

const axios = request({
	// baseURL: 'http://192.168.1.138',
    baseURL: window.location.origin + '/api'
})

// 媒体类型
export const gettypes = (params) => {
    return axios({
        url: '/admin/dict/type/paper_media_category',
        method: 'get',
        params,
    })
}

// 文章列表
export const getlist = (params, data) => {
    return axios({
        url: '/admin/article/page',
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        params,
        data: JSON.stringify(data)
    })
}

// 文章详情
export const getdetail = (id) => {
    return axios({
        url: '/admin/article/' + id,
        method: 'get',
    })
}

export const getmtlist = (type) => {
    return axios({
        url: '/admin/dict/type/' + type,
        method: 'get'
    })
}

// 搜索
export const search = (params) => {
    return axios({
        url: '/admin/article/page?current=1&size=10',
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        data: JSON.stringify(params)
    })
}

import axios from 'axios'

const baseUrl = "https://autumnfish.cn"

// const getBanner = (type = 0) => {
//     return axios.get(baseUrl + '/banner', { type })
// }
// 
// const recommand = (limit = 30) => {
//     return axios.get(baseUrl + '/personalized', { limit })
// }

// api = {
//     getBanner,
//     recommand
// }
const api = {
    // 获取轮播图的接口
    getBanner(type = 0) {
        return axios.get(`${baseUrl}/banner?type=${type}`)
    },
    // 获取推荐歌单的接口
    getRecommandMusic(limit = 10) {
        return axios.get(`${baseUrl}/personalized?limit=${limit}`)
    },
    // 获取最新歌单
    getNewSong() {
        return axios.get(`${baseUrl}/personalized/newsong`)
    },
    // 获取音乐播放地址
    getPlayUrl(id) {
        return axios.get(`${baseUrl}/song/url?id=${id}`)
    },
    // 推荐mv
    getRecommandMv() {
        return axios.get(`${baseUrl}/personalized/mv`)
    },
    // 全部mv
    getAllMv(params) {
        return axios.get(`${baseUrl}/mv/all`, { params })
    },
    // 播放音乐
    playMusic(id) {
        return axios.get(`${baseUrl}/song/url?id=${id}`)
    },
    // 获取精品歌单列表
    getHighMusic(cat, limit) {
        return axios.get(`${baseUrl}/top/playlist/highquality?cat=${cat}&limit=${limit}`)
    },
    // 获取歌单列表
    getMusic(cat, limit, offset) {
        return axios.get(`${baseUrl}/top/playlist?cat=${cat}&limit=${limit}&offset=${offset}`)
    }
}
export default api
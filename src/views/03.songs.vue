<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span :class="{'item': true, 'active': typeActive==item.id}" @click="filterSong(item.id)" v-for="(item, index) in typeList" :key="index">{{item.type}}</span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item, index) in detailSong" :key="index">
          <td>{{index+1}}</td>
          <td>
            <div class="img-wrap" @click="playSong(item.id)">
              <img :src="item.album.blurPicUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{item.name}}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span>{{item.album.name}}</span>
            </div>
          </td>
          <td>{{item.artists[0].name}}</td>
          <td>{{item.album.name}}</td>
          <td>{{item.bMusic.playTime | playTime}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'songs',
  filters:{
    playTime(ms) {
      let m = parseInt(ms/1000/60)
      m = m < 10? '0'+m: m
      let s = parseInt(ms/1000%60)
      s = s < 10? '0'+s: s
      return m+':'+s
    }
  },
  data() {
    return {
      typeList: [],
      typeActive: 0,
      detailSong: []
    };
  },
  created() {
    this.typeList = [
      {
        type: '全部',
        id: 0
      },
      {
        type: '华语',
        id: 7
      },
      {
        type: '欧美',
        id: 96
      },
      {
        type: '日本',
        id: 8
      },
      {
        type: '韩国',
        id: 16
      },
    ],
    this.filterSong(this.typeActive)
  },
  methods: {
    filterSong(id) {
      this.typeActive = id
      this.$api.getTopMusic(id).then( res => {
        console.log(res)
        this.detailSong = res.data.data.splice(0,20)
      })
    },
    playSong(id) {
      this.$api.getPlayUrl(id).then(res=>{
        console.log(res)
        this.$parent.musicUrl = res.data.data[0].url
      })
    }
  },
};
</script>

<style >

</style>

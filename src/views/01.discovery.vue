<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in recommandMusic" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in newSong" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <span
              class="singer"
              v-for="(item1, index1) in item.song.artists"
              :key="index1"
            >{{item1.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in recommandMv" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "discovery",
  data() {
    return {
      bannerList: [],
      recommandMusic: [],
      newSong: [],
      recommandMv: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getBanner();
      this.getRecommandMusic();
      this.getNewSong();
      this.getRecommandMv();
    },
    getBanner() {
      this.$api.getBanner().then(res => {
        this.bannerList = res.data.banners;
      });
    },
    getRecommandMusic() {
      this.$api.getRecommandMusic(10).then(res => {
        this.recommandMusic = res.data.result.splice(0, 10);
      });
    },
    getNewSong() {
      this.$api.getNewSong().then(res => {
        this.newSong = res.data.result;
      });
    },
    getRecommandMv() {
      this.$api.getRecommandMv().then(res => {
        this.recommandMv = res.data.result;
      });
    }
  }
};
</script>

<style >
</style>

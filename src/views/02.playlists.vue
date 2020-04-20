<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="hightMusic.coverImgUrl" alt />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">{{hightMusic.name}}</div>
        <div class="info">{{hightMusic.description}}</div>
      </div>
      <img src="../assets/listCover.jpg" alt class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{'active': item==activeType}"
          v-for="(item, index) in ['全部','欧美','华语','流行','说唱','摇滚','民谣','电子','轻音乐','影视原声','ACG','怀旧','治愈','旅行']"
          :key="index"
          @click="pickType(item)"
        >{{item}}</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in musicList" :key="index">
            <div class="img-wrap" @click="toPlaylistDetail(item.id)">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      pageSize: 10,
      // 选中的歌单类型
      activeType: "全部",
      hightMusic: {},
      musicList: []
    };
  },
  created() {
    this.getHighMusic();
    this.getMusic(this.activeType);
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getMusic(this.activeType);
    },
    getHighMusic() {
      this.$api.getHighMusic("全部", 1).then(res => {
        console.log(res);
        this.hightMusic = res.data.playlists[0];
      });
    },
    pickType(val) {
      this.activeType = val;
      this.page = 1;
      this.getMusic(val);
      // console.log(this.activeType);
    },
    getMusic(val) {
      this.$api.getMusic(val, this.pageSize, (this.page - 1) * 20).then(res => {
        console.log(res);
        this.total = res.data.total;
        this.musicList = res.data.playlists;
      });
    },
    toPlaylistDetail(id){
      this.$router.push('/playlist/'+id)
    }
  }
};
</script>

<style >
</style>

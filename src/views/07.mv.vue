<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="mvUrl"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="info.cover" alt />
          </div>
          <span class="name">{{info.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{info.name}}</h2>
          <span class="date">发布：{{info.publishTime}}</span>
          <span class="number">播放：{{info.playCount}}次</span>
          <p class="desc" v-if="info.desc">{{info.desc}}</p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">
          精彩评论
          <span class="number">(666)</span>
        </p>
        <div class="comments-wrap">
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论
          <span class="number">(666)</span>
        </p>
        <div class="comments-wrap">
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
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
        :page-size="5"
        :limit="limit"
      ></el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item, index) in simiMv" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount}}</div>
              </div>
              <span class="time">{{item.duration|playTime}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mv",
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
      id: 0,
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      mvUrl: '',
      simiMv: [],
      info: {}
    };
  },
  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.init()
  },
  methods: {
    init(){
      this.getMvUrl()
      this.getSimiMv()
      this.getMvDetail()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getMvUrl() {
      this.$api.getMvUrl(this.id).then(res=>{
        // console.log(res)
        this.mvUrl = res.data.data.url
      })
    },
    getSimiMv() {
      this.$api.getSimiMv(this.id).then(res=>{
        // console.log(res)
        this.simiMv = res.data.mvs
      })
    },
    getMvDetail() {
      this.$api.getMvDetail(this.id).then(res=>{
        console.log(res)
        this.info = res.data.data
      })
    }
  }
};
</script>

<style></style>

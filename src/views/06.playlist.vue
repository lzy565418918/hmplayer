<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlistImg" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{playlistName}}</p>
        <div class="author-wrap">
          <img class="avatar" :src="playlistAuthorImg" alt="" />
          <span class="name">{{playlistAuthor}}</span>
          <span class="time">{{playlistTime}} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item, index) in playlisyTags" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{playlistDesc}}</span
          >
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane :label="`歌曲列表(${playlistTrackCount})`" name="1">
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
            <tr class="el-table__row" v-for="(item, index) in playlist" :key="index">
              <td>{{index+1}}</td>
               <td>
                <div class="img-wrap" @click="playSong(item.id)">
                  <img :src="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                </div>
              </td>
              <td>{{item.ar[0].name}}</td>
              <td>{{item.al.name}}</td>
              <td>{{item.dt|playTime}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${playlistCommentCount})`" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">精彩评论<span class="number">({{hotComments.length}})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in hotComments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied&&item.beReplied.length">
                  <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">{{item.time|transDate}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">最新评论<span class="number">(666)</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied&&item.beReplied.length">
                  <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date" v-if="(new Date().getTime() - item.time)/(1000*60*60*24)>3">{{item.time | transDate}}</div>
                <div class="date" v-else>{{item.time | newComment}}</div>
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
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'playlist',
  filters:{
    playTime(ms) {
      let m = parseInt(ms/1000/60)
      m = m < 10? '0'+m: m
      let s = parseInt(ms/1000%60)
      s = s < 10? '0'+s: s
      return m+':'+s
    },
    transDate(ms) {
      function bl(num){
        return num<10?'0'+num:num
      }
      let arr = []
      let nyr = new Date(ms).toLocaleDateString().split('/')

      arr[0] = new Date(ms).getHours()
      arr[1] = new Date(ms).getMinutes()
      arr[2] = new Date(ms).getSeconds()
      nyr = nyr.map(item=>{
        // debugger
        return item = bl(item)
      })
      arr = arr.map(item=>{
        return item = bl(item)
      })
      return nyr.join('-')+' '+arr.join(':')
    },
    newComment(ms) {
      let diff = (new Date().getTime() - ms)/1000
      // 分
      let m = parseInt(diff/60)
      // 时
      let h = parseInt(m/60)
      // 天
      let d = parseInt(h/24)
      if(d>0){
        return d+'天前'
      }else if(h>0){
        return h+'小时前'
      }else if(m>0){
        return m+'分钟前'
      }else{
        return '刚刚'
      }
    }
  },
  data() {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      id: null,
      playlist: [],
      commentList: [],
      playlistName: '',
      playlistImg: '',
      playlisyTags: [],
      playlistDesc: '',
      playlistCommentCount: 0,
      playlistAuthor: '',
      playlistAuthorImg: '',
      playlistTime: null,
      playlistTrackCount: null,
      hotComments: [],
      comments: [],
    };
  },
  created(){
    console.log(this.$route.params.id)
    this.id = this.$route.params.id
    this.initPlaylist()
    this.getComment()
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      let offset = (this.page - 1)*20
      this.$api.getComment(this.id, offset).then(res=>{
        this.comments = res.data.comments
      })
    },
    initPlaylist(){
      this.$api.getPlayListDetail(this.id).then(res=>{
        let result = res.data.playlist
        this.playlist = result.tracks
        // console.log(result)
        this.playlistDesc = result.description
        this.playlisyTags = result.tags
        this.playlistImg = result.coverImgUrl
        this.playlistName = result.name
        this.playlistCommentCount = result.commentCount
        this.playlistAuthor = result.creator.nickname
        this.playlistAuthorImg = result.creator.backgroundUrl
        this.playlistTime = new Date(result.createTime).toLocaleDateString().replace(/\//g,'-')
        this.playlistTrackCount = result.trackCount
      })
    },
    playSong(id) {
      this.$api.getPlayUrl(id).then(res=>{
        // console.log(res)
        this.$parent.musicUrl = res.data.data[0].url
      })
    },
    getComment() {
      this.$api.getComment(this.id).then(res=>{
        this.total = res.data.total
        this.hotComments = res.data.hotComments
        this.comments = res.data.comments
        console.log(this.comments)
      })
    }
  }
};
</script>

<style >

</style>

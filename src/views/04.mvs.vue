<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="type-wrap" v-for="(item, index) in typeAll" :key="index">
        <span class="type-type">{{item.typeName}}:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="(item1, index1) in item.typeList" :key="index1">
            <span
              class="title"
              :class="{'active': typeActive[index]==item1}"
              @click="filterMvType(index,item1)"
            >{{item1}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item" @click="toMv(item.id)" v-for="(item, index) in mvList" :key="index">
          <div class="img-wrap">
            <img :src="item.cover" alt />
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
  </div>
</template>

<script>
export default {
  name: "mvs",
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 8,
      // mv列表
      mvList: [],
      // mv分类
      typeAll: [],
      // pickArea
      typeActive: ["全部", "全部", "上升最快"]
    };
  },
  created() {
    this.typeAll = [
      {
        typeName: "地区",
        typeList: ["全部", "内地", "港台", "欧美", "日本", "韩国"]
      },
      {
        typeName: "类型",
        typeList: ["全部", "官方版", "原声", "现场版", "网易出品"]
      },
      {
        typeName: "排序",
        typeList: ["上升最快", "最热", "最新"]
      }
    ];
    this.getAllMv();
  },
  methods: {
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getAllMv();
    },
    filterMvType(num, val) {
      // this.typeActive[num] = val;
      // 单独改变数组的某一个值（或者单独改变对象的某一个属性）需要用this.$set方法，否则无法实时更新，
      this.$set(this.typeActive, num, val);
      this.getAllMv();
    },
    getAllMv() {
      this.$api
        .getAllMv({
          area: this.typeActive[0],
          type: this.typeActive[1],
          order: this.typeActive[2],
          limit: this.limit,
          offset: (this.page - 1) * this.limit
        })
        .then(res => {
          console.log(res);
          this.mvList = res.data.data;
        });
    }
  }
};
</script>

<style >
</style>

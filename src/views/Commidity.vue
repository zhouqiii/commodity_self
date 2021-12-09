<template>
  <div>
    <div class="box" style="background:#ffffff">
      <!--头部筛选条件-->
      <div class="activity_select">
        <div class="activity_condition">
          <el-form
            ref="form"
            :model="commodity"
            label-width="100px"
            class="form_select flex-row-start"
            label-position="right"
            size="mini"
          >
            <el-form-item label="商品名称:" class="form_acname">
              <el-input v-model="commodity.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="起始时间段:" class="form_time">
              <el-col :span="10">
                <el-date-picker
                  type="date"
                  placeholder="开始日期"
                  v-model="commodity.startDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                >
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2">~</el-col>
              <el-col :span="10">
                <el-date-picker
                  type="date"
                  placeholder="结束日期"
                  v-model="commodity.endDate"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="query" size="mini" @click="getdata">查询</el-button>
              <el-button
                type="primary"
                style="margin-left:50px"
                class="info"
                size="mini"
                @click="addType"
                icon="el-icon-edit"
                >新增单品</el-button
              >
              <el-button
                type="success"
                class="down_load"
                size="mini"
                @click="downExcel"
                icon="el-icon-download"
                >导出</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <commodity-index :loading="loading" :data="tableData"></commodity-index>
    </div>
  </div>
</template>
<script>
import { getAllListMock } from '../api/resource';
import CommodityIndex from '../components/ActivityComponents/CommodityIndex.vue';

export default {
  components: { CommodityIndex },
  name: 'Commidity',
  data() {
    return {
      commodity: {
        // 头部商品筛选
        name: '',
        startDate: '',
        endDate: '',
      },
      tableData: {}, // 表格数据
      loading: false,
    };
  },
  methods: {
    // 获取表格数据
    getdata() {
      this.loading = true;
      getAllListMock(this.commodity)
        .then((res) => {
          this.loading = false;
          this.tableData = res.data.list;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 导出
    downExcel() {
      console.log('导出');
    },
    // 新增单品
    addType() {
      this.$router.push({ path: '/ComConfig' });
    },
  },
  mounted() {
    this.getdata();
  },
};
</script>
<style lang="less" scoped>
@import url('../assets/css/pageStyle/commodity.less');
</style>

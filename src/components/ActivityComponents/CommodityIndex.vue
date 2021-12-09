<template>
  <div>
    <div class="box">
      <!--商品表格-->
      <div class="activity_table">
        <div class="activity_table_data" v-loading="loading">
          <el-table
            height="450"
            :data="tableData"
            ref="table"
            :row-key="getRowKeys"
            :expand-row-keys="expends"
            @expand-change="expandChange"
            border
            style="width: 100%;margin-top:10px"
            show-summary
            :row-style="{ height: '30px' }"
            :cell-style="{ padding: '4px 0' }"
            :header-cell-style="{ background: '#f5f5f5', padding: '8px 0' }"
          >
            <el-table-column type="expand" align="center">
              <template slot-scope="props">
                <el-table
                  :data="
                    currentPage * pageSize <= props.row.total
                      ? props.row.list.slice((currentPage - 1) * pageSize, pageSize)
                      : props.row.list.slice((currentPage - 1) * pageSize)
                  "
                  :border="true"
                  :row-style="{ background: '#f5f5f5' }"
                  :header-cell-style="{ background: '#f5f5f5' }"
                >
                  <el-table-column prop="time" label="时间" align="center"></el-table-column>
                  <el-table-column prop="number" label="数量" align="center"></el-table-column>
                  <el-table-column prop="money" label="金额" align="center"></el-table-column>
                  <el-table-column prop="operating" label="操作" align="center">
                    <template :slot-scope="props.row">
                      <el-button size="small" type="danger" plain @click="deleteData(props.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <div>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    :total="props.row.total"
                    layout="total, sizes, prev, pager, next, jumper"
                  >
                  </el-pagination>
                </div>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column
              prop="name"
              label="商品名称"
              width="180"
              align="center"
            ></el-table-column>
            <el-table-column prop="id" label="商品ID" align="center"></el-table-column>
            <el-table-column
              prop="date"
              label="起止时间"
              width="240"
              align="center"
            ></el-table-column>
            <el-table-column prop="price" label="单价" align="center">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.ifChange"
                  v-model="scope.row.price"
                  size="mini"
                  @change="changePrice(scope.$index, scope.row)"
                ></el-input>
                <span v-else>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="总金额" align="center"></el-table-column>
            <el-table-column prop="operating" label="操作" align="center" width="240">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="agreeChange(scope.$index, scope.row)"
                  >修改单价</el-button
                >
                <el-button size="small" type="primary" @click="dialogChange(scope.row)"
                  >新增记录</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--弹框-->
      <el-dialog :visible.sync="showDialog" width="40%" center title="新增">
        <el-form :model="dialogForm">
          <el-form-item label="商品名称:" :label-width="labelWidth">
            <el-input v-model="dialogForm.name" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="日期:" :label-width="labelWidth">
            <el-date-picker
              v-model="dialogForm.time"
              type="date"
              placeholder="选择日期"
              format="yyyy - MM - dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="数量:" :label-width="labelWidth">
            <el-input
              v-model="dialogForm.number"
              autocomplete="off"
              @input="caculateMoney"
            ></el-input>
          </el-form-item>
          <el-form-item label="单价:" :label-width="labelWidth">
            <el-input v-model="dialogForm.price" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="金额:" :label-width="labelWidth">
            <el-input v-model="dialogForm.money" autocomplete="off" disabled></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" size="mini">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommodityIndex',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showDialog: false,
      tableData: [],
      dialogForm: {
        // 弹框新增/修改
        name: '',
        price: '',
        number: '',
        money: '',
        time: new Date(),
      },
      labelWidth: '80px',
      currentPage: 1, // 当前页
      pageSize: 10, // 每页多少条
      getPrice: '', // 存储单元格修改之前的单价,当单价修改取消时可以恢复原始数据
      expends: [],
      getRowKeys(row) {
        // 设置row-key只展示一行
        return row.id;
      },
    };
  },
  methods: {
    // 由输入的数量自动计算单价X数量的金额
    caculateMoney(num) {
      this.dialogForm.money = parseInt(this.dialogForm.price, 10) * parseInt(num, 10);
    },
    // 新增数据
    dialogChange(scope) {
      this.showDialog = true;
      this.dialogForm.name = scope.name;
      this.dialogForm.price = scope.price;
      console.log(scope, '1111111');
    },
    // 删除子数据
    deleteData(val) {
      console.log(val, '222222222');
      this.$confirm('确定删除该条数据？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
      }).then(() => {
        console.log('删除操作请求');
      });
    },
    // 修改商品单价时触发的事件
    changePrice(index, row) {
      const item = row;
      this.$confirm('修改单价后该商品对应记录金额会改变，是否确定修改？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
      })
        .then(() => {
          let count = 0;
          item.list.forEach((ele) => {
            count += parseInt(ele.number, 10);
            this.$set(ele, 'money', parseInt(item.price, 10) * parseInt(ele.number, 10));
          });
          item.amount = count * parseInt(item.price, 10);
          item.ifChange = false;
          return item;
        })
        .catch(() => {
          item.ifChange = false;
          item.price = this.getPrice;
          this.$set(this.tableData, index, item);
        });
      console.log(index, row, 'changePrice');
    },
    // 让单价变成可修改
    agreeChange(index, row) {
      const item = row;
      item.ifChange = true;
      this.getPrice = item.price;
      this.$set(this.tableData, index, item);
    },
    // 拿到数据后处理给表格赋值
    assignData(res) {
      console.log('这是mock数据：', res);
      if (res.allList.total >= 0) {
        this.total = res.allList.total;
      }
      if (res.allList) {
        this.tableData = res.allList;
        this.tableData.forEach((item) => {
          const data = item;
          data.date = `${data.startDate}~${data.endDate}`;
          data.ifChange = false;
          return data;
        });
      } else {
        this.tableData = [];
      }
    },
    // 每页条数pageSize改变时触发
    handleSizeChange(val) {
      this.pageSize = val;
      // this.getdataActivity();
    },
    // currentPage当前页改变时会触发
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.getdataActivity();
    },
    // // 展开行
    expandChange(row, expandedRows) {
      const that = this;
      that.currentPage = 1;
      that.pageSize = 10;
      // console.log(row, expandedRows, that.expends);
      if (expandedRows.length) {
        // 只展开一行//说明展开了
        that.expends = [];
        if (row) {
          that.expends.push(row.id); // 只展开当前行id
        }
        //  this.tablaData(row.eqId)  这里可以调用接口数据渲染
      } else {
        // 说明收起了
        that.expends = [];
      }
    },
    // 新增单品
    addType() {
      this.$router.push({ path: '/ComConfig' });
    },
  },
  // 解决table同时设置高度和合计行时，合计行不显示问题
  updated() {
    this.$nextTick(() => {
      this.$refs.table.doLayout();
    });
  },
  watch: {
    data(val) {
      this.assignData(val);
    },
  },
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/pageStyle/commodity.less');
</style>

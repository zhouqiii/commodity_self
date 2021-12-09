<template>
  <div class="config">
    <div class="rule base_rule">
      <div class="title">商品</div>
      <div class="base_rule_input">
        <el-form
          ref="form"
          :model="commodity"
          label-width="100px"
          :rules="rules"
          label-position="right"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="commodity.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品单价" prop="price">
                <el-input v-model="commodity.price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="rule collection_rule">
      <div class="flex-row-between">
        <div class="title">添加记录</div>
        <div class="elIcon" @click="addRecords"><i class="el-icon-circle-plus-outline"></i></div>
      </div>
      <div>
        <el-table
          :data="recordsTable"
          border
          style="width: 100%"
          :row-style="{ height: '25px' }"
          :cell-style="{ padding: '2px 0' }"
          :header-cell-style="{ background: '#ffffff', padding: '4px 0' }"
        >
          <el-table-column prop="time" label="日期">
            <template slot-scope="scope">
              <el-date-picker
                size="mini"
                v-model="scope.row.time"
                type="date"
                placeholder="选择日期"
                format="yyyy - MM - dd"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="数量" align="center">
            <template slot-scope="scope">
              <el-input
                v-model.number="scope.row.number"
                style="width:60%"
                size="mini"
                @change="countMoney(scope.$index, scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="金额" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.money"
                style="width:60%"
                size="mini"
                :disabled="true"
              ></el-input>
              <span style="margin-left:.1rem">元</span>
            </template>
          </el-table-column>
          <el-table-column prop="operating" label="操作" align="center">
            <template slot-scope="scope">
              <div class="delBtn">
                <el-button size="mini" @click="deleteRecords(scope.$index)" :disabled="disabledRule"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="rule operate_btn">
      <div class="operate_save">
        <el-button type="primary" size="mini" style="width:80px" @click="saveActivity">
          保存
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const checkNum = (rule, value, callback) => {
      const num = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (!value) {
        callback(new Error('请输入商品单价!'));
      } else if (!num.test(value)) {
        callback(new Error('请输入有效数字!'));
      } else {
        callback();
      }
    };
    return {
      commodity: {
        name: '',
        price: '',
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [
          { validator: checkNum, trigger: 'blur' },
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
      },
      recordsTable: [{ time: new Date(), money: 0 }],
      disabledRule: true,
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    // 添加商品记录
    addRecords() {
      this.recordsTable.push({ time: new Date(), money: 0 });
      if (this.recordsTable.length >= 2) {
        this.disabledRule = false;
      }
    },
    // 删除当前商品记录
    deleteRecords(index) {
      this.recordsTable.splice(index, 1);
      if (this.recordsTable.length === 1) {
        this.disabledRule = true;
      }
    },
    // 由数量计算金额
    countMoney(index, row) {
      this.$set(row, 'money', parseInt(row.number, 10) * this.commodity.price);
      return row;
      //   row.money = parseInt(row.number, 10) * this.commodity.price;
    },
    // 保存
    saveActivity() {
      console.log('保存');
    },
  },
};
</script>
<style lang="less" scoped>
@import url('../assets/css/pageStyle/config.less');
</style>

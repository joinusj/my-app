<template>
  <section style="height: 100%">
    <div style="height: 32px;padding: 6px 0">
      <el-select placeholder="订单状态"
                 size="small"
                 v-model="search.type"
                 style="width: 100px;">
        <el-option :value="1" label="已支付"></el-option>
        <el-option :value="2" label="待支付"></el-option>
        <el-option :value="3" label="已失效"></el-option>
      </el-select>
      <el-select placeholder="全部"
                 size="small"
                 v-model="search.goods_cate"
                 style="width: 100px;">
        <el-option v-for="(item,key) in goodsCateObj" :label="item" :value="key" :key="key"></el-option>
      </el-select>
      <el-date-picker
        size="small"
        style="width: 220px;"
        v-model="search.time"
        type="daterange"
        start-placeholder="开始时间"
        end-placeholder="结束时间">
      </el-date-picker>
      <el-select placeholder="搜素"
                 size="small"
                 v-model="search.key"
                 style="width: 100px;">
        <el-option :value="1" label="订单编号"></el-option>
      </el-select>
      <el-input placeholder="关键字"
                size="small"
                v-model="search.keyword"
                style="width: 120px;"></el-input>
      <el-button size="small" type="primary" @click="searching">搜索</el-button>
      <span class="pay_amount">统计: <span class="font-red">{{pay_amount}}</span> 元</span>

    </div>
    <div style="height: calc(100% - 110px)">
      <el-table :data="cloudsOrderList"  style="height: 100%" max-height="100%">
        <el-table-column label="订单编号" prop="order_no"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            {{scope.row.order_type | order_type}}
          </template>
        </el-table-column>
        <el-table-column label="总金额">
            <template slot-scope="scope">
              {{scope.row.amount}}元
            </template>
        </el-table-column>
        <el-table-column label="支付">
          <template slot-scope="scope">
            <span class="font-red">{{scope.row.pay_amount}}</span>元
          </template>
        </el-table-column>
        <!--<el-table-column label="折扣">-->
          <!--<template slot-scope="scope">-->
           <!--{{scope.row.promation_amount}}元-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="数量">
          <template slot-scope="scope">
            {{scope.row.num}}台
          </template>
        </el-table-column>
        <el-table-column label="时长" prop="spend_time">
        </el-table-column>
        <el-table-column label="支付">
          <template slot-scope="scope">
            {{scope.row.dateline | dataFormat('yyyy-MM-dd HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.status |order_status}}
          </template>
        </el-table-column>

      </el-table>
    </div>
    <el-col v-if="total>pageSize" style="padding: 20px;text-align: center">
      <el-pagination
        small
        layout="sizes,prev, pager, next"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </el-col>
  </section>
</template>
<script>
  import {
    getCloudsOrder,//获取用户云主机订单列表
  } from "@/api/api"
  export default{
      name:'CloudsOrder',
      props:{
        userUid:{
          type:String,
          default:'',
        },
        index:{
          type:String,
          default:''
        }
      },
      data(){
          return{
            page:1,
            pageSize:10,
            cloudsOrderList:[],
            total:0,
            search:{
              type:1,
              goods_cate:'',
              time:[],
              key:1,
              keyword:''
            },
            goodsCateObj:{},
            pay_amount:''
          }
      },
      watch: {
        userUid(val){
  //          console.log(this.index)
          if (val !== "" && this.index == '云主机订单') {
              this.search={
                type:1,
                goods_cate:'',
                time:[],
                key:1,
                keyword:''
              }
            this.cloudsOrderLoad()
          }
        },
        index(val){
  //           console.log(val)
          if (val == '云主机订单' && this.userUid !== "") {
            this.search={
              type:1,
              goods_cate:'',
              time:[],
              key:1,
              keyword:''
            }
            this.cloudsOrderLoad()
          }

        },
      },
      methods:{
          cloudsOrderLoad(){
            let params={
              uid:this.userUid,
              page:this.page,
              pagesize:this.pageSize,
              goods_cate:this.search.goods_cate,
              date:this.search.time,
              search_type:this.search.key,
              keyword:this.search.keyword
            }
            getCloudsOrder(params).then(res=>{
              if(res.status===1){
                this.cloudsOrderList=res.data.list
                this.total=res.data.total
                this.pay_amount=res.data.count.pay_amount
              }else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
            }).catch(()=>{

            })
          },
          handleSizeChange(val){
            this.page=1
            this.pageSize=val
            this.cloudsOrderLoad()
          },
          handleCurrentChange(val){
            this.page=val
            this.cloudsOrderLoad()
          },
          searching(){
            this.cloudsOrderLoad()
          }


      },
      mounted(){
        this.goodsCateObj=JSON.parse(sessionStorage.getItem('config')).data_config_goods_cate
      }

  }


</script>
<style scoped lang="scss">
  .pay_amount{
    padding: 4px 20px;
    font-size: 14px;
    float: right;
  }
</style>

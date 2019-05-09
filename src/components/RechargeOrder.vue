<template>
  <section style="height: 100%;">
    <div style="height: 32px;padding: 6px 0">
      <el-date-picker
        size="small"
        style="width: 220px;"
        v-model="search.time"
        type="daterange"
        start-placeholder="开始时间"
        end-placeholder="结束时间">
      </el-date-picker>
      <el-button size="small" type="primary" @click="searching">搜索</el-button>
    </div>
    <div style="height: calc(100% - 110px)">
      <el-table :data="rechargeList" style="height: 100%" max-height="100%">
        <el-table-column label="订单号">
          <template slot-scope="scope">
          <span class="font-blue">
            {{scope.row.recharge_no}}
          </span>
          </template>
        </el-table-column>
        <el-table-column label="金额">
          <template slot-scope="scope">
          <span v-if="!scope.row.amount">
              -
          </span>
            <span class="font-red" v-if="scope.row.amount">
              {{scope.row.amount}}元
            </span>
          </template>
        </el-table-column>
        <el-table-column label="支付渠道">
          <template slot-scope="scope">
           <span>
              {{scope.row.payment_name}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
           <span class="font-green">
              {{scope.row.dateline | dataFormat('yyyy-MM-dd HH:mm')}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="充值状态">
          <template slot-scope="scope">
          <span v-if="scope.row.status==0" class="font-red">
            待支付
          </span>
            <span v-if="scope.row.status==1" class="font-green">
            已成功
          </span>
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
    getUserChargeList,//获取用户充值订单列表
  } from "@/api/api"
  export default{
      name:"RechargeOrder",
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
          rechargeList:[],
          total:0,
          search:{
              time:[]
          }
        }
      },
      watch:{
        userUid(val){
  //          console.log(this.index)
          if(val!==""&&this.index=='充值订单'){
            this.page=1
            this.pageSize=10
            this.userChargeListLoad()
          }
        },
        index(val){
//             console.log(val)
          if(val=='充值订单'&&this.userUid!==""){
              this.page=1
              this.pageSize=10
              this.userChargeListLoad()
          }

        },

      },
      methods:{
        userChargeListLoad(){
            let params={
              uid:this.userUid,
              page:this.page,
              pagesize:this.pageSize
            }
            getUserChargeList(params).then(res=>{
//              console.log(res)
              if(res.status===1){
                this.rechargeList=res.data.list
                this.total=res.data.total
              }else{
                  this.$message({
                    message:res.msg,
                    type:'error'
                  })
              }
            }).catch(()=>{

            })
        },
        handleSizeChange(val){
            this.page=1
            this.pageSize=val
            this.userChargeListLoad()
        },
        handleCurrentChange(val){
          this.page=val
          this.userChargeListLoad()
        },
        searching(){

        }



      }


  }

</script>
<style>

</style>

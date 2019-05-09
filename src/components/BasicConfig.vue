<template>
  <section>
    <el-row style="padding: 20px 0" :gutter="40">
      <el-col :span="24">

        <i class="fa fa-address-card"></i> &nbsp;概览
        <hr>
      </el-col>
      <el-col :span="12">
        <div class="clouds_overview clouds_overview_border">
          <div class="clouds_box">
            <span class="clouds_label">用户:</span>
            {{cloudsObj.uid}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">云主机UUID:</span>
            {{cloudsObj.uuid}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">云主机名称:</span>
            {{cloudsObj.name}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">规格:</span>
            {{cloudsObj.cpuNum}}核{{cloudsObj.memorySize}}G
          </div>
          <div class="clouds_box">
            <span class="clouds_label">地区:</span>
            {{cloudsObj.zone_code | territory}}{{cloudsObj.cluster_code | cluster(cloudsObj.zone_code,cloudsObj.cluster_code)}}
          </div>
          <!--<div class="clouds_box">-->
            <!--<span class="clouds_label">集群:</span>-->
            <!---->
          <!--</div>-->
          <div class="clouds_box" v-if="cloudsObj.security_group_name">
            <span class="clouds_label">安全组:</span>
            {{cloudsObj.security_group_name}}
          </div>

          <div class="clouds_box">
            <span class="clouds_label">开始时间:</span>
            {{cloudsObj.start_dateline | dataFormat('yyyy-MM-dd HH:mm')}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">到期时间:</span>
            {{cloudsObj.end_dateline | dataFormat('yyyy-MM-dd HH:mm')}}
          </div>

          <div class="clouds_box">
            <span class="clouds_label">	续费时间:</span>
            {{cloudsObj.renew_dateline | dataFormat('yyyy-MM-dd HH:mm')}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">删除时间:</span>
            {{cloudsObj.delete_dateline | dataFormat('yyyy-MM-dd HH:mm')}}
          </div>


          <!--<div class="clouds_box">-->
            <!--<span class="clouds_label">状态:</span>-->
            <!--{{cloudsObj.status}}-->
          <!--</div>-->
          <!--<div class="clouds_box">-->
            <!--<span class="clouds_label">是否删除:</span>-->
            <!--<el-switch v-model="cloudsObj.indel" disabled>-->
            <!--</el-switch>-->
          <!--</div>-->
          <div class="clouds_box">
            <span class="clouds_label">状态:</span>
            {{cloudsObj.state | status}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">当前订单编号:</span>
            {{cloudsObj.order_no}}
          </div>

          <div class="clouds_box">
            <span class="clouds_label">是否设置控制台密码:</span>
            <el-switch v-model="cloudsObj.vncpass" disabled>
            </el-switch>
          </div>
          <div class="clouds_box">
            <span class="clouds_label">锁定:</span>
            <el-switch v-model="cloudsObj.inlock" disabled>
            </el-switch>
          </div>
          <div class="clouds_box">
            <span class="clouds_label">购买渠道:</span>
            <el-radio v-model="cloudsObj.source" label="public" disabled>自定义购买</el-radio>
            <el-radio v-model="cloudsObj.source" label="recommend" disabled>套餐购买</el-radio>
          </div>

          <!--<div class="clouds_box">-->
            <!--<span class="clouds_label">云主机名称:</span>-->
            <!--<div v-for="(net,index) in cloudsObj.network" :key="index">-->
              <!--<span v-for="(item,index) in net" :key="index">-->
                <!--<span v-if="index==0">{{item}}</span>-->
                <!--<span v-if="index==1">{{item | config_isp}}</span>-->
                <!--<span v-if="index==2&&net[4]==0">{{item}}M</span>-->
                <!--<span v-if="index==3&&net[4]==0">{{item}}G</span>-->
                <!--<span v-if="index==4&&item==0" style="color:#00aaff;">公网</span>-->
                <!--<span v-if="index==4&&item==1">私网</span>-->
                <!--<span v-if="index==5&&item==1">默认</span>-->
              <!--</span>-->
            <!--</div>-->
          <!--</div>-->



        </div>
      </el-col>
      <el-col :span="12">
        <div class="clouds_overview">
          <div class="clouds_box">
            <span class="clouds_label">系统名称:</span>
            {{cloudsObj.ecs_name}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">备注:</span>
            {{cloudsObj.description}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">区域UUID:</span>
            {{cloudsObj.zoneuuid}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">区域UUID:</span>
            {{cloudsObj.zoneuuid}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">集群UUID:</span>
            {{cloudsObj.clusteruuid}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">镜像UUID:</span>
            {{cloudsObj.imageuuid}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">物理机UUID:</span>
            {{cloudsObj.hostuuid}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">规格UUID:</span>
            {{cloudsObj.sizeuuid}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">根盘UUID:</span>
            {{cloudsObj.rootVolumeUuid}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">三层网络UUID:</span>
            {{cloudsObj.l3netuuid}}
          </div>

          <div class="clouds_box">
            <span class="clouds_label">平台:</span>
            {{cloudsObj.platform}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">镜像名称:</span>
            {{cloudsObj.image_name}}
          </div>
          <div class="clouds_box">
            <span class="clouds_label">镜像类型:</span>
            {{cloudsObj.ostype}}
          </div>













        </div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  import {
    getCloudsDetail//,获取云主机基本详情
  } from '@/api/api'
  export default{
    name:'BasicConfig',
    props:{
      id:{
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
          cloudsObj:{}
        }
    },
    watch:{
        id(val){
//          console.log(val,this.index)
          if(val!==''&&this.index==="基本属性"){
            this.getVm()
          }
        },
        index(val){
          if(val=='基本属性'&&this.id!==""){
            this.getVm()
          }
        }
    },
    methods:{
      getVm(){
          let params={
              id:this.id
          }
          getCloudsDetail(params).then(res=>{
            if(res.status===1){
                this.cloudsObj=res.data
            }else{
              this.$message({
                message:res.msg,
                type:'error'
              })
            }
          }).catch(()=>{

          })
      }
    }
  }
</script>
<style scoped>
  .clouds_box{
    margin-bottom: 14px;
  }
  .clouds_label{
    width: 140px;
    display: inline-block;
  }
  .clouds_overview{
    font-size: 12px;
    margin-top: 20px;

  }
  .clouds_overview_border{
    border-right: 1px solid #dae0e6;
  }
</style>

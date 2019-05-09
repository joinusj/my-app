<template>
  <section style="background-color: #fff;">
    <el-row>
      <el-col :span="3" style="padding: 10px;">
        {{title}}
      </el-col>
      <el-col :span="6">
        <slot name="menu"></slot>
        <!--<ul class="menu">-->
          <!--<li class="menu_item"-->
              <!--v-for="(item,index) in menu"-->
              <!--:class="{'menu_item_active':activeMenu==index}"-->
              <!--:key="index"-->
              <!--@click="chooseMenu(index)">-->
            <!--{{item}}{{index}}-->
          <!--</li>-->
          <!--&lt;!&ndash;<li class="menu_item">&ndash;&gt;-->
            <!--&lt;!&ndash;企业&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--</ul>-->
      </el-col>
    </el-row>


  </section>
</template>
<script>
  export default{
      name:'globalHeader',
      props:{

      },
      data(){
        return{
          title:'',
          menu:['个人','企业'],
          activeMenu:0
        }
      },
      watch:{

      },
      methods:{
        chooseMenu(index){
            this.activeMenu=index
        }
      },
      mounted(){
        this.title=this.$route.name
      }

  }
</script>
<style scoped lang="scss">

</style>

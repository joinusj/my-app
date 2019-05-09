<template>
  <div class="pop_container" v-show="popVisible">
    <div class="pop_shadow"></div>
    <div class="pop_header">
      <slot name="title">
      </slot>
    </div>
    <div class="pro_content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default{
      name:'Popup',
      props:['visible'],
      data(){
          return{
            popVisible:false
          }
      },
      watch:{
        visible(val){
//            console.log(val)
          this.popVisible=val
        }
      }

  }
</script>
<style scoped lang="scss">
  .pop_container{
    width: calc(100% - 178px);
    height: calc(100vh - 139px);
    background-color: #fff;
    position: absolute;
    top: 113px;
    left: 178px;
    z-index: 9;
    /*border-left: 1px solid #dae0e6;*/
    /*overflow-y: auto;*/
  }
  .pop_shadow{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
  }
  .pop_shadow:after{
    content: " ";
    height: 100%;
    position: absolute;
    left: -6px;
    width: 6px;
    background: linear-gradient(270deg,rgba(197,219,232,.4),rgba(211,220,227,0));
  }
  .pop_header{
    height: 48px;
    width: 100%;
    /*background-color: #cbedff;*/
    border-bottom: 1px solid #eff9ff;
    position: relative;
  }
  .pro_content{
    height: calc(100% - 48px);
    overflow-y: auto;
    padding: 0 40px;
    position: relative;
  }
</style>

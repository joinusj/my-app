<template>
  <section>
    配置信息
  </section>
</template>
<script>
  export default{
      name:'ConfigInform',
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

          }
      },
      watch:{
        id(val){
          if(val!==""&&this.index=='配置信息'){

          }
        },
        index(val){
//             console.log(val)
          if(val=='配置信息'&&this.id!==""){

          }

        },
      }
  }
</script>
<style>

</style>

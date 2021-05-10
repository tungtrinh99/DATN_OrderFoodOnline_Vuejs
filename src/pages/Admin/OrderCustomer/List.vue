<template>
  <base-list
   :textTitle="title"
   :entity="entity"
   :isAction = "isAction"
   :isAdd = "isAdd"
  ></base-list> 
</template>

<script>
import BaseList from '../../BasePage/BaseList'
const entity = "food";
export default {

  data(){
    return{
      title : 'Đơn hàng khách hàng',
      entity,
      isAction :false,
      isAdd :false,
    }
  },
  components:{
    'base-list':BaseList
    
  }
}
</script>

<style>

</style>
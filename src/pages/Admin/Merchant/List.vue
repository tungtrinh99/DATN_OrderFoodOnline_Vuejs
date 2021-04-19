<template>
  <base-list
   :textTitle="title"
   :entity="entity"
   :role="role"
   :isAction = "isAction"
   :isAdd = "isAdd"

  ></base-list> 
</template>

<script>
import BaseList from '../../BasePage/BaseList'
const entity = "user";
export default {

  data(){
    return{
      title : 'Chủ quán',
      entity,
      isAction :true,
      isAdd :true,
      role : 4

    }
  },
  components:{
    'base-list':BaseList
    
  }
}
</script>

<style>

</style>
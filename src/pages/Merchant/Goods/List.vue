<template>
  <div>
    <base-list
      :textTitle="title"
      :entity="entity"
      :isAction="isAction"
      :isAdd="isAdd"
      :isTabs="isTabs"
      :isMerchant="isMerchant"
    ></base-list>
  </div>
</template>
<script>
import BaseList from "../../BasePage/BaseList";
const entity = "restaurant-food";
export default {
  data() {
    return {
      title: "Đồ ăn",
      entity,
      isAction: true,
      isAdd: true,
      isTabs: false,
      isMerchant : true
    };
  },
  components: {
    "base-list": BaseList,
  },
  methods: {
    openRecord(value) {
     
    },
  },
};
</script>

<style>
</style>
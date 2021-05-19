<template>
  <div>
    <base-list
      :textTitle="title"
      :entity="entity"
      :isAction="isAction"
      :isAdd="isAdd"
      :isTabs="isTabs"
    ></base-list>
  </div>
</template>
<script>
import BaseList from "../../BasePage/BaseList";
const entity = "orders";
export default {
  data() {
    return {
      title: "Đơn hàng",
      entity,
      isAction: false,
      isAdd: false,
      isTabs: false,
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
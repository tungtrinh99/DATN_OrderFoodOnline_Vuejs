<template>
  <base-list
    :textTitle="title"
    :entity="entity"
    :isMerchant="isMerchant"
    :isAdd="isAdd"
  ></base-list>
</template>

<script>
import BaseList from "../../BasePage/BaseList";
const entity = "restaurant-discount";
export default {
  data() {
    return {
      title: "Ưu đãi",
      entity,
      isAction: true,
      isAdd: true,
      isMerchant: true
    };
  },
  components: {
    "base-list": BaseList
  }
};
</script>

<style></style>

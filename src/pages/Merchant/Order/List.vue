<template>
  <div>
    <base-list
      :textTitle="title"
      :entity="entity"
      :isAction="isAction"
      :isAdd="isAdd"
      :isTabs="isTabs"
      :isMerchant = "isMerchant"
      @openRecord="openRecord($event)"
    ></base-list>
    <show
      :show="show"
      :title="'Chi tiết đơn hàng'"
      :formData="formData"
      :listItemOfOrder ="listItemOfOrder"
      @close="close"
    >
    </show>
  </div>
</template>
<script>
import BaseList from "../../BasePage/BaseList";
import Show from "./Show";
import http from "../../../http-common"
const entity = "orders";
export default {
  data() {
    return {
      title: "Đơn hàng",
      entity,
      isAction: false,
      isAdd: false,
      isTabs: false,
      isMerchant : true,
      show: false,
      formData :{},
      listItemOfOrder : []
    };
  },
  components: {
    "base-list": BaseList,
    Show,
  },
  
  methods: {
    openRecord(value) {
      let orderDetail = http.get("/order/detail", {
        params: { id: value },
      });
      let orderItemDetail = http.get("/order-item/list", { params:{id: value }});
      Promise.all([orderDetail, orderItemDetail])
        .then((res) => {
          this.formData = res[0].data.data.items[0];
          this.listItemOfOrder = res[1].data.data.items;
          this.show = true;
        })
        .catch((err) => {
          console.log(err);
        });
     
    },
    close() {
      this.show = false;
    },
  },
};
</script>

<style>
</style>
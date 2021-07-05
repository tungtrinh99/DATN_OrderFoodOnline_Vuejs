<template>
  <div>
    <base-list
      :textTitle="title"
      :entity="entity"
      :isAction="isAction"
      :isAdd="isAdd"
      @openRecord="openRecord($event)"
    ></base-list>
    <show
      :show="show"
      :title="'Chi tiết vận đơn'"
      :formData="formData"
      :orders ="orders"
      @close="close"
    >
    </show>
  </div>
</template>

<script>
import BaseList from "../../BasePage/BaseList.vue";
import Show from "./Show.vue";
import http from "./../../../http-common";
const entity = "lading-bill";
export default {
  data() {
    return {
      title: "Vận đơn",
      entity,
      isAction: false,
      isAdd: true,
      formData: {},
      show: false,
      orders : []
    };
  },
  components: {
    "base-list": BaseList,
    Show
  },
  methods: {
    openRecord(value) {
      http
        .get("/lading-bill/detail", {
          params: { id: value }
        })
        .then(res => {
          this.formData = res.data[0];
          this.orders = this.formData.orders != null ? this.formData.orders.split(',') : [] ;
          this.show = true;
        })
        .catch(err => {});
    },
    close() {
      this.show = false;
    }
  }
};
</script>

<style></style>

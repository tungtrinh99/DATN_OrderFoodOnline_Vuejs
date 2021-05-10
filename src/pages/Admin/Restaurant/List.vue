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
      @close="close"
      :formData="formData"
      :listFoodRestaurant="listFoodRestaurant"
      :listFood="listFood"
      :title="'Chi tiết quán ăn'"
    ></show>
  </div>
</template>

<script>
import BaseList from "../../BasePage/BaseList";
import Show from "./Show";
import http from "./../../../http-common";

const entity = "restaurant";
export default {
  data() {
    return {
      title: "Quán ăn",
      entity,
      isAction: true,
      isAdd: true,
      show: false,
      formData: {},
      listFoodRestaurant: [],
      listFood: [],
    };
  },
  components: {
    "base-list": BaseList,
    Show,
  },
  methods: {
    openRecord(value) {
      let detailRestaurant = http.get("/restaurant/detail", {
        params: { id: value },
      });
      let foodRestaurant = http.post("/restaurant-food/list", { id: value });
      Promise.all([detailRestaurant, foodRestaurant])
        .then((res) => {
          this.formData = res[0].data.data.items[0];
          this.listFoodRestaurant = res[1].data.data.items;
          this.show = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close() {
      this.show = false;
    },
    getListFood() {
      http
        .post("/food/list")
        .then((res) => {
          this.listFood = res.data.data.items;
        })
        .then((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getListFood()
  },
};
</script>

<style>
</style>
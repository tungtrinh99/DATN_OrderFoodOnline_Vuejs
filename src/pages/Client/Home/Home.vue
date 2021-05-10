<template>
  <div
    class="content home-banner"
    :style="{
      'background-image':
        'url(' + require('@/assets/images/Background/back-ground.jpg') + ')',
    }"
  >
    <div class="container">
      <a-row>
        <a-col  :sm="24" :md="24" :lg="9">
          <div class="home-form">
            <form-search :formData="listRestaurant"></form-search>

          </div>
        </a-col>
        <a-col  :sm="0" :md="0" :lg="2"></a-col>
        <a-col  :sm="24" :md="24" :lg="13">
          <div class="home-list-restaurant">
            <div class="list-restaurant">
              <a-list
                :grid="{ gutter: 16, column: 3 }"
                :data-source="listRestaurant"
              >
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card :bodyStyle="{ padding: 0 }">
                    <item :key="index" :data="item"></item>
                  </a-card>
                </a-list-item>
              </a-list>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>

</template>
<script>
import FormSearch from "./Form.vue";
import Item from "@/components/Cards/Item.vue";
import http from "@/http-common";
import EventBus from "../../../event-bus";
export default {
  components: {
    "form-search": FormSearch,
    item: Item,
  },
  data() {
    const listFoods = [];
    const listRestaurant = [];
    return {
      listFoods,
      listRestaurant,
      keyword : ""
    };
  },
  methods: {
    fetchData() {
      http
        .post("/restaurant/list",{
          textSearch : this.keyword
        })
        .then((response) => {
          this.listRestaurant = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    
    
  },
  created() {
    this.fetchData()
  },
  
};
</script>
<style scoped>

.content {
  padding-top: 64px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.home-banner {
  top: 64px;
  z-index: 0;
  overflow: hidden;
}
.home-list-restaurant {
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 12px 16px;
  border: 1px solid #d7d7d7;
  background-color: #fff;
  margin-top : 80px
}
.home-form{
  margin-top :800px;
}
.ant-card.ant-card-bordered{
  border : none;
  
}
</style>

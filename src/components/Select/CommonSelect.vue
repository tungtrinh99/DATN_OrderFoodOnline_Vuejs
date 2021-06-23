<template>
  <a-select
    show-search
    :value="value"
    placeholder="Tìm quán ăn , địa điểm ..."
    style="width: 100%"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    @search="handleSearch"
    @change="handleChange"
  >
    <a-select-option v-for="d in data" :key="d.id">
      <router-link class="item-content" :to="'/detail-restaurant'">
        <div class="item-restaurant" @click="nextPage(d)">
          <div class="img-restaurant">
            <img
              :src="require('../../../public/images/' + d.avatar_id)"
              alt=""
            />
          </div>
          <div class="info-restaurant">
            <span>{{ d.title }}</span>
            <span>{{ d.full_address }}</span>
          </div>
        </div>
      </router-link>
    </a-select-option>
  </a-select>
</template>
<script>
import http from "../../http-common";
let debounce = require("debounce");

export default {
  data() {
    this.fetchData = debounce(this.fetchData, 800);
    return {
      data: [],
      value: undefined,
      keyword: "",
    };
  },
  methods: {
    nextPage(data) {
      localStorage.setItem("client_restaurant_info", JSON.stringify(data));
      this.$emit('closeFormSearch')
    },
    fetchData() {
      http
        .post("/restaurant/list", {
          textSearch : this.keyword
        })
        .then((response) => {
          this.data = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    handleSearch(value) {
      this.keyword = value;
      this.fetchData();
    },
    handleChange(value) {
      this.value = value;
    },
  },
};
</script>
<style scoped>
.item-restaurant {
  display: flex;
  align-items: center;
}
.img-restaurant {
  width: 50px;
  height: 30px;
}
.img-restaurant > img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.info-restaurant {
  display: flex;
  flex-direction: column;
  align-content: center;
  padding-left: 10px;
}
.info-restaurant > span:nth-child(1) {
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color :#252525;
}
.info-restaurant > span:nth-child(2) {
  font-size: 12px;
  color: #959595;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
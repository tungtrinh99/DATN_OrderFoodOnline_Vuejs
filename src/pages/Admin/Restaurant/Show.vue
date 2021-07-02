<template>
  <div>
    <a-modal
      :title="title"
      v-model="show"
      width="60%"
      :bodyStyle="{
        padding: '16px',
        overflowY: 'auto',
        overflowX: 'auto'
      }"
      :dialog-style="{ top: '100px' }"
    >
      <div slot="footer">
        <a-button @click="close">Thoát</a-button>
      </div>
      <div class="title">Thông tin</div>
      <a-descriptions>
        <a-descriptions-item label="Tên quán ăn">
          {{ formData.title }}
        </a-descriptions-item>

        <a-descriptions-item label="Giờ mở cửa">
          {{ formData.opentime }}
        </a-descriptions-item>
        <a-descriptions-item label="Giờ đóng cửa">{{
          formData.closetime
        }}</a-descriptions-item>
        <a-descriptions-item label="Số điện thoại">
          {{ formData.phone_number }}
        </a-descriptions-item>
        <a-descriptions-item label="Địa chỉ">
          {{ formData.full_address }}
        </a-descriptions-item>
      </a-descriptions>
      <!-- <div class="title">
        <span>Danh sách món ăn</span>
        <a-button type="primary" @click="addFood">Thêm món</a-button>
      </div> -->
      <div class="title">Danh sách món ăn</div>
      <a-list
        style="height : 400px;over-flow : auto"
        class="demo-loadmore-list"
        item-layout="horizontal"
        :data-source="listFoodRestaurant"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <!-- <a-button slot="actions" type="danger" @click="removeItem(item)"
            >Xóa</a-button
          > -->
          <a-list-item-meta description="">
            <a slot="title" href="">{{ item.title }}</a>
            <a-avatar
              slot="avatar"
              :src="require('../../../../public/images/' + item.avatar_id)"
            />
          </a-list-item-meta>
          <div style="margin-right: 16px">
            {{
              Intl.NumberFormat("vi-VN").format(
                Number.parseFloat(item.cost).toFixed(0)
              )
            }}
            đ
          </div>
        </a-list-item>
      </a-list>
    </a-modal>
    <a-modal
      :title="'Danh sách món ăn'"
      v-model="visible"
      width="80%"
      :bodyStyle="{
        padding: '16px',
        height: '80vh',
        overflowY: 'auto',
        overflowX: 'auto'
      }"
      :dialog-style="{ top: '20px' }"
    >
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :columns="columns"
        :data-source="listFood"
        :pagination="false"
      />
      <div slot="footer">
        <a-button type="primary" @click="save">Lưu</a-button>
      </div>
      <div slot="file" slot-scope="text">
        <img
          v-if="text"
          :src="require('../../../../public/images/' + text)"
          alt="avatar"
          :style="{ width: '30px', height: '30px' }"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import http from "../../../http-common";
import ColumnConfig from "../../../common/ColumnConfig";

export default {
  props: {
    show: Boolean,
    formData: Object,
    title: String,
    listFood: Array,
    listFoodRestaurant: Array
  },
  data() {
    const columns = ColumnConfig["food"];

    return {
      columns,
      key: 0,
      selectedRowKeys: [],
      visible: false,
      listAddFood: []
    };
  },
  methods: {
    addFood() {
      this.visible = true;
    },
    close() {
      this.$emit("close");
    },
    removeItem(value) {
      let name = value.title;
      let component = this;
      this.$confirm({
        title: "Bạn chắc chắn muốn xoá món ăn " + name + "?",
        content: "",
        okText: "Xác nhận",
        cancelText: "Huỷ",
        onOk() {
          http
            .post(
              "/restaurant-food/delete",
              {
                restaurant_id: value.restaurant_id
              },
              {
                params: {
                  id: value.id
                }
              }
            )
            .then(res => {
              component.$message.success(`Xoá món ${name} thành công`);
            })
            .catch(err => {
              console.log(err);
            });
        },
        onCancel() {}
      });
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    save() {
      this.listAddFood = [];
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        this.listAddFood.push(
          this.listFood.filter(
            (item, index) => index == this.selectedRowKeys[i]
          )[0]
        );
      }
      this.listAddFood.forEach(d => {
        http
          .post("/restaurant-food/save", {
            food_id: d.id,
            restaurant_id: this.formData.id
          })
          .then(res => {
            this.$message.success(
              "Thêm món ăn " +
                d.title +
                "thành công cho nhà hàng " +
                this.formData.title
            );
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>
<style scoped>
/* .title {
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
} */
.title {
  text-transform: uppercase;
  color: #6d6f71;
  padding: 5px 0 0;
  margin: 10px 0 20px 0px;
  text-align: left;
  font-weight: 700;
}
.demo-loadmore-list {
  /* height: 350px; */
  overflow: auto;
}
</style>

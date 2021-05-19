<template>
  <div>
    <a-menu
      theme="dark"
      mode="horizontal"
      :default-selected-keys="['2']"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="notify">
        <a-icon type="bell" style="margin: 0"></a-icon>
      </a-menu-item>
      <a-menu-item key="user" @click="showUser">
        <a-icon type="user" style="margin: 0" ></a-icon>
      </a-menu-item>
    </a-menu>
    <a-drawer
      placement="right"
      :closable="false"
      :visible="visibleUser"
      :after-visible-change="afterVisibleChange"
      @close="onCloseUser"
    >
      <a-row>
        <a-col :span="8"></a-col>
        <a-col :span="12">
          <a-avatar shape="square" :size="64" icon="user" />

        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-descriptions
            title="Thông tin người dùng"
            :column="1"
            :size="'middle'"
            :style="{
              marginTop: '30px',
            }"
          >
            <a-descriptions-item label="Họ và tên">
              {{ dataUser.fullname }}
            </a-descriptions-item>
            <a-descriptions-item label="Email">
              {{ dataUser.email }}
            </a-descriptions-item>
            <a-descriptions-item label="Tên đăng nhập">
              {{ dataUser.username }}
            </a-descriptions-item>
            <a-descriptions-item label="Số điện thoại">
              {{ dataUser.phone }}
            </a-descriptions-item>
             <a-descriptions-item label="Ngày sinh">
              {{moment(dataUser.birth_date).format("DD-MM-YYYY")  }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-button
        :style="{
          position: 'absolute',
          bottom: '10px',
          width: '80%',
        }"
        type="danger"
        block
        @click="logout"
      >
        Đăng xuất</a-button
      >
    </a-drawer>

    <!-- <a-drawer
      width="480"
      placement="right"
      :closable="false"
      :visible="visibleNotify"
      @close="onCloseNotify"
    >
      <h1>
        Thông báo
      </h1>
      <a-divider />
    </a-drawer>  -->
  </div>
</template>

<script>
import http from "../../http-common";
import moment from 'moment';

export default {
  data() {
    return {
      moment,
      visibleUser: false,
      visibleNotify: false,
      dataUser: {},
      dataCart: [],
      priceTotal: 0,
      count: 0,
      quantity: 0,
      sizeList: [],
    };
  },
  methods: {
    showUser() {
      this.visibleUser = true;
      this.fetchUser();
    },
    
    showNotify() {
      this.visibleNotify = true;
    },
    onCloseUser() {
      this.visibleUser = false;
    },
    onCloseNotify() {
      this.visibleNotify = false;
    },
    onCloseCart() {
      this.visibleCart = false;
    },
    afterVisibleChange(val) {
     
    },
    logout() {
      localStorage.removeItem("merchant_logged_in");
      localStorage.removeItem("user_merchant_id");
      localStorage.removeItem("merchant_restaurant_id");
      this.$router.push("/merchant/login");
      this.$notification["success"]({
        message: "Thông báo đăng xuất",
        description: "Bạn đã đăng xuất thành công!",
      });
    },
    fetchUser() {
      let userID = JSON.parse(localStorage.getItem('user_merchant_id'));
      
      http
        .get("/user/detail", {
          params : {
            id : userID
          }
        })
        .then((response) => {
          this.dataUser = response.data.data.items[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onChange(value) {
      this.quantity = value;
    },
    upload(index) {
      http
        .post("/cart/update", { index: index, value: this.quantity })
        .then((response) => {
          this.getSession();
          this.$message.success(`Cập nhật thành công số lượng`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
}
.cart-total-price {
  display: flex;
  justify-content: flex-end;
}
</style>

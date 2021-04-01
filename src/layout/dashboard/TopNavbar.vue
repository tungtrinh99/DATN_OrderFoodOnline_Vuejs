<template>
  <div>
    <a-menu
      theme="dark"
      mode="horizontal"
      :default-selected-keys="['2']"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="notify" @click="showNotify">
        <a-icon type="bell" style="margin:0"></a-icon>
      </a-menu-item>
      <a-menu-item key="cart" @click="showCart" v-if="role == 1">
        <a-badge :count="this.count">
          <a-icon type="shopping" style="margin:0"></a-icon>
        </a-badge>
      </a-menu-item>
      <a-menu-item key="user" @click="showUser">
        <a-icon type="user" style="margin:0"></a-icon>
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
              marginTop: '30px'
            }"
          >
            <a-descriptions-item label="Họ và tên">
              {{ data.fullname }}
            </a-descriptions-item>
            <a-descriptions-item label="Email">
              {{ data.email }}
            </a-descriptions-item>
            <a-descriptions-item label="Tên đăng nhập">
              {{ data.username }}
            </a-descriptions-item>
            <a-descriptions-item label="Số điện thoại">
              {{ data.phone }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <a-button
        :style="{
          position: 'absolute',
          bottom: '10px',
          width: '80%'
        }"
        type="danger"
        block
        @click="logout"
      >
        Đăng xuất</a-button
      >
    </a-drawer>
    <a-drawer
      width="720"
      placement="right"
      :closable="false"
      :visible="visibleCart"
      @close="onCloseCart"
    >
      <h2>
        Giỏ hàng (<span style="color:red">{{ count }}</span
        >)
      </h2>
      <a-divider />
      <div v-for="(d, index) in dataCart" :key="index">
        <a-row class="row">
          <a-col :span="3">
            <img
              :style="{ width: '40px', height: '40px' }"
              :src="require('../../../../public/images/' + d.avatar)"
              alt="avatar"
            />
          </a-col>
          <a-col :span="4">
            <a-input-number
              size="small"
              :min="1"
              :default-value="d.qty"
              @change="onChange"
            />
          </a-col>
          <a-col :span="10">
            <a>{{ d.name }}</a>
          </a-col>
          <a-col :span="4">
            <span>{{ Intl.NumberFormat().format(d.price) }} đ</span>
          </a-col>
          <a-col :span="3">
            <a-button-group>
              <a-button
                type="primary"
                icon="upload"
                @click="upload(index)"
                style="margin-right:3px"
              />
              <a-button type="danger" icon="close" @click="remove(index)" />
            </a-button-group>
          </a-col>
        </a-row>
        <a-divider />
      </div>
      <div class="cart-total-price">
        <h2>
          Tổng Tiền :
          <span style="color:red"
            >{{ Intl.NumberFormat().format(priceTotal) }} đ</span
          >
        </h2>
      </div>
      <a-button
        :style="{
          position: 'absolute',
          bottom: '10px',
          width: '90%'
        }"
        v-if="this.count"
        type="danger"
        block
        @click="createOrder"
      >
        Tạo đơn hàng</a-button
      >
    </a-drawer>
    <a-drawer
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
    </a-drawer>
  </div>
</template>

<script>
import http from "../../../http-common";

export default {
  data() {
    var role = localStorage.getItem("logged-in");
    return {
      visibleUser: false,
      visibleCart: false,
      visibleNotify: false,
      data: {},
      dataCart: [],
      priceTotal: 0,
      count: 0,
      role,
      quantity: 0,
      sizeList : []
    };
  },
  methods: {
    showUser() {
      this.visibleUser = true;
      this.getSession();
    },
    showCart() {
      this.visibleCart = true;
      this.getSession();
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
      console.log("visible", val);
    },
    logout() {
      http
        .get("/auth/logout")
        .then(response => {
          localStorage.removeItem("logged-in");
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSession() {
      http
        .get("/auth/get_session", { withCredentials: true })
        .then(response => {
          this.priceTotal = 0;
          this.data = response.data.user.data[0];
          this.dataCart = response.data.cart.data;
          console.log(this.dataCart[0].id);
          http.get(`/goods/property/size/${this.dataCart[0].id}`).then(response =>{
            this.sizeList = response.data;
            console.log(this.sizeList);
          });
          this.dataCart.forEach(item => {
            this.priceTotal += item.price * item.qty;
          });
          this.count = this.dataCart.length;
        })
        .catch(error => {
          console.log(error);
        });
    },
    createOrder() {
      http
        .post("/orderclient/create", { idUser: this.data.id })
        .then(response => {
          this.visibleCart = false;
          this.$message.success("Tạo đơn hàng thành công");
          this.$router.push("/order-client");
        })
        .catch(error => {
          this.$message.error(message.error);
        });
    },

    remove(index) {
      http
        .post("/cart/delete", { index: index })
        .then(response => {
          this.getSession();
          this.$message.success(`Xóa thành công sản phẩm khỏi đơn hàng`);
        })
        .catch(error => {
          console.log(error);
        });
    },
    onChange(value) {
      this.quantity = value;
    },
    upload(index) {
      http
        .post("/cart/update", { index: index, value: this.quantity })
        .then(response => {
          this.getSession();
          this.$message.success(`Cập nhật thành công số lượng`);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getSession();
  }
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

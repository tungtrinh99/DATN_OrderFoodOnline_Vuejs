<template>
  <div class="home-header">
    <a-layout class="header" :key="key">
      <a-layout-header style="background: #fff">
        <div class="container header-wrapper">
          <div class="header-left">
            <div class="logo" @click="goHome">
              <img
                :src="require('@/assets/logo.png')"
                alt=""
                :style="{ height: '48px' }"
              />
            </div>
            <a-menu
              theme="light"
              mode="horizontal"
              :default-selected-keys="['quan-an']"
              :style="{ lineHeight: '64px', marginLeft: '24px' }"
            >
              <a-menu-item
                v-for="type in listTypeRestaurant"
                :key="type.code"
                @click="() => router(type)"
              >
                {{ type.title }}
              </a-menu-item>
            </a-menu>
          </div>
          <div class="header-right">
            <div class="header-icon-search">
              <a-icon type="search" class="btn-search" />
            </div>
            <div class="user-account">
              <a-avatar
                v-if="defaultAuthToken"
                class="user-avatar"
                @click="showUserInfo"
              >
                <a-icon type="user"></a-icon>
              </a-avatar>
              <a-button @click="login" v-else>Đăng nhập</a-button>
            </div>
          </div>
        </div>
      </a-layout-header>
    </a-layout>
    <a-drawer
      width="320"
      placement="right"
      :closable="false"
      :visible="isShowUserInfo"
      @close="onClose"
      :bodyStyle="{ background: '#fff' }"
    >
      <p :style="[pStyle, pStyle2]">Thông tin khách hàng</p>
      <a-avatar
        shape="square"
        :size="64"
        icon="user"
        :src="
          require(`../../../public/images/${
            formData.avatar_id ? formData.avatar_id : avatarDefault
          }`)
        "
      />
      <p :style="pStyle">Cá nhân</p>
      <a-row>
        <a-col :span="24">
          <div class="person-info">
            <span>Họ tên : </span>
            <span>{{ formData ? formData.fullname : "" }}</span>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <div class="person-info">
            <span>Ngày sinh : </span>
            <span>{{
              formData ? moment(formData.birth_date).format("DD-MM-YYYY") : ""
            }}</span>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="person-info">
            <span>Số điện thoại : </span>
            <span>{{ formData ? formData.phone_number : "" }}</span>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <div class="person-info">
            <span>Email : </span>
            <span>{{ formData ? formData.email : "" }}</span>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="person-info">
            <span>Địa chỉ : </span>
            <span>{{ formData ? formData.full_address : "" }}</span>
          </div>
        </a-col>
      </a-row>
      <p :style="pStyle">Đơn hàng</p>
      <a-tabs
        default-active-key="1"
        style="height: 480px;position : relative;overflow : auto"
      >
        <a-tab-pane key="0" tab="Lịch sử">
          <a-list item-layout="horizontal" :data-source="cart">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta
                :description="moment(item.create_at).format('DD/MM/YYYY HH:mm')"
              >
                <a
                  slot="title"
                  style="font-size: 12px"
                  @click="showOrder(item)"
                  >{{ item.name_of_restaurant_id }}</a
                >
                <a-avatar slot="avatar" :src="require('@/assets/dish.png')" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Đơn hàng hiện tại" force-render>
          <a-list item-layout="horizontal" :data-source="currentCart">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta
                :description="moment(item.create_at).format('DD/MM/YYYY HH:mm')"
              >
                <a
                  slot="title"
                  @click="showOrder(item)"
                  style="font-size: 12px"
                  >{{ item.name_of_restaurant_id }}</a
                >
                <a-avatar slot="avatar" :src="require('@/assets/dish.png')" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
      </a-tabs>

      <div class="group-button">
        <a-button
          type="primary"
          :style="{ width: '100%', marginBottom: '8px' }"
          @click="showFormEdit"
          >Sửa thông tin</a-button
        >
        <a-button type="danger" :style="{ width: '100%' }" @click="logout"
          >Đăng xuất</a-button
        >
      </div>
    </a-drawer>
    <a-modal
      v-model="isShowFormEdit"
      :dialog-style="{ top: '20px' }"
      :title="'Sửa thông tin'"
      okText="Lưu"
      cancelText="Hủy"
      @ok="save"
    >
      <a-form-model
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="user"
        :rules="rules"
        ref="ruleForm"
      >
        <a-form-model-item label="Ảnh khách hàng" prop="avatar_id">
          <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :customRequest="customRequest"
            @change="handleChangeFile"
          >
            <img
              v-if="user.avatarId"
              :src="require('../../../public/images/' + user.avatarId)"
              alt="file"
              :style="{ width: '120px', height: '120px' }"
            />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Tải ảnh sản phẩm</div>
            </div>
          </a-upload>
        </a-form-model-item>

        <a-form-model-item
          label="Tên khách hàng"
          ref="fullname"
          prop="fullname"
        >
          <a-input v-model="user.fullname" type="text" :allowClear="true" />
        </a-form-model-item>
        <a-form-model-item label="Tên đăng nhập" ref="username" prop="username">
          <a-input v-model="user.username" type="text" :allowClear="true" />
        </a-form-model-item>
        <a-form-model-item label="Mật khẩu" ref="password" prop="password">
          <a-input-password v-model="user.password" />
        </a-form-model-item>
        <a-form-model-item label="Email" ref="email" prop="email">
          <a-input v-model="user.email" type="text" :allowClear="true" />
        </a-form-model-item>
        <a-form-model-item label="Ngày sinh" ref="birthDate" prop="birth_date">
          <a-date-picker
            v-model="user.birthDate"
            type="date"
            format="DD-MM-YYYY"
          />
        </a-form-model-item>
        <a-form-model-item label="Giới tính" ref="gender" prop="gender">
          <a-input v-model="user.gender" type="text" :allowClear="true" />
        </a-form-model-item>
        <a-form-model-item
          label="Số điện thoại"
          ref="phoneNumber"
          prop="phone_number"
        >
          <a-input v-model="user.phoneNumber" type="text" :allowClear="true" />
        </a-form-model-item>
        <a-form-model-item label="Địa chỉ" ref="address" prop="address">
          <a-input v-model="user.address" type="text" :allowClear="true" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
      v-model="isShowHistoryOrder"
      width="40%"
      :dialog-style="{ top: '20px' }"
      :closable="false"
      :footer="false"
    >
      <a-row>
        <a-col :span="9">
          <img
            :src="
              require(`../../../public/images/${
                detailOrder.avatar_of_restaurant
                  ? detailOrder.avatar_of_restaurant
                  : 'avatar_default.jpg'
              }`)
            "
            style="width: 100%; border: 1px solid #eee; border-radius: 4px"
            alt=""
          />
        </a-col>
        <a-col :span="1"> </a-col>
        <a-col :span="14">
          <div class="history-order">
            <div class="history-order-top">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 8px;
                "
              >
                <div class="history-order-logo">
                  <img
                    :src="require(`@/assets/mini_logo.png`)"
                    style="width: 24px"
                    alt=""
                  />
                </div>
                <div class="history-order-time">
                  {{
                    moment(detailOrder.create_at)
                      .lang("vi")
                      .format("dddd,Do MMMM  YYYY, HH:mm")
                  }}
                </div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <div class="history-order-status">
                  <b>{{
                    listStatus.find(item => item.id === detailOrder.status)
                      ? listStatus.find(item => item.id === detailOrder.status)
                          .text
                      : ""
                  }}</b>
                </div>
                <div class="history-order-code">
                  Mã đơn hàng {{ detailOrder.order_code }}
                </div>
              </div>
            </div>
            <div class="history-order-content">
              <div class="delivery-info">
                <div class="title">
                  <span>Thông tin giao hàng</span>
                </div>
                <div class="delivery-info-content">
                  <div class="restaurant-address">
                    <span>Vị trí nhà hàng</span>
                    <div class="restaurant-address-text">
                      <b>{{ detailOrder.location_destination }}</b>
                    </div>
                  </div>
                  <div class="customer-address">
                    <span>Địa điểm giao hàng</span>
                    <div class="customer-address-text">
                      <b>{{ detailOrder.location_arrival }}</b>
                    </div>
                  </div>
                </div>
              </div>
              <div class="detail-history-order">
                <div class="title">
                  <span>Chi tiết đơn hàng</span>
                </div>
                <div class="detail-history-order-list-item">
                  <div
                    class="item"
                    v-for="(item, index) in listOrderItem"
                    :key="index"
                  >
                    <div class="item-text">{{ item.name_of_food }}</div>
                    <div class="item-quantity">x {{ item.quantity }}</div>
                  </div>
                </div>
              </div>
              <div class="detail-pay">
                <div class="title">
                  <span>Chi tiết thanh toán</span>
                </div>
                <div class="detail-pay-list-item">
                  <div class="item">
                    <div class="item-text">Phí giao hàng</div>
                    <div class="item-quantity">
                      {{
                        Intl.NumberFormat("vi-VN").format(
                          Number.parseFloat(detailOrder.shipping).toFixed(0)
                        )
                      }}
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-text">Giảm giá</div>
                    <div class="item-quantity">
                      {{
                        detailOrder.promo
                          ? Intl.NumberFormat("vi-VN").format(
                              Number.parseFloat(detailOrder.promo).toFixed(0)
                            )
                          : 0
                      }}
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-text"><b>Tổng thanh toán</b></div>
                    <div class="item-quantity">
                      <b>{{
                        Intl.NumberFormat("vi-VN").format(
                          Number.parseFloat(detailOrder.grand_total).toFixed(0)
                        )
                      }}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="history-order-footer"
              v-if="
                detailOrder.status == 1 ||
                  detailOrder.status == 2 ||
                  detailOrder.status == 3
              "
            >
              <a-button
                type="primary"
                v-if="detailOrder.status == 3"
                @click="completeOrder(detailOrder)"
                >Đã nhận được đơn hàng</a-button
              >
              <a-button
                type="danger"
                v-if="detailOrder.status == 1 || detailOrder.status == 2"
                @click="cancelOrder(detailOrder)"
                >Hủy đơn hàng</a-button
              >
            </div>
          </div>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
import EventBus from "../../event-bus";
import http from "../../http-common";
import RuleConfig from "../../common/RuleConfig";
import moment from "moment";
import mixin from "@/mixin";

export default {
  mixins: [mixin],

  data() {
    var rules = RuleConfig["customer"];

    return {
      rules,
      loading: false,
      moment,
      listTypeRestaurant: [],
      defaultAuthToken: "",
      isShowUserInfo: false,
      isShowFormEdit: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "0"
      },
      pStyle2: {
        marginBottom: "24px"
      },
      key: 0,
      avatarDefault: "avatar_default.jpg",
      user: {
        username: "",
        userCode: "",
        password: "",
        email: "",
        fullname: "",
        gender: null,
        birthDate: "",
        phoneNumber: "",
        address: "",
        active: 1,
        avatarId: "",
        role: 2,
        fullAddress: ""
      },
      formData: {},
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      cart: [],
      currentCart: [],
      isShowHistoryOrder: false,
      detailOrder: {},
      listOrderItem: []
    };
  },
  methods: {
    completeOrder(data) {
      http
        .post("/orders/update", { status: 4 }, { params: { id: data.id } })
        .then(res => {
          this.$message.success("Xác nhận đơn thành công");
          this.isShowHistoryOrder = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelOrder(data) {
      const component = this;
      this.$confirm({
        title: `Bạn có muốn hủy đơn ${data.order_code} không?`,
        okText: "Xác nhận",
        okType: "danger",
        cancelText: "Hủy",

        onOk() {
          http
            .post("/orders/update", { status: 5 }, { params: { id: data.id } })
            .then(res => {
              component.$message.success("Hủy đơn hàng thành công");
              component.isShowHistoryOrder = false;
            })
            .catch(err => {
              component.$message.error(err);
            });
        }
      });
    },
    getStatus() {
      this.listStatus.find(item => item.id === this.detailOrder.status);
    },
    showOrder(data) {
      this.isShowHistoryOrder = true;
      this.detailOrder = data;
      http
        .get("/order-item/list", {
          params: {
            id: data.id
          }
        })
        .then(res => {
          this.listOrderItem = res.data.data.items;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goHome() {
      this.$router.push("/home");
    },
    login() {
      this.$router.push("/login");
    },
    getTypeRestaurant() {
      http
        .get("/restaurant-type/list")
        .then(response => {
          this.listTypeRestaurant = response.data.data.items;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getInfoUser() {
      let userID = JSON.parse(localStorage.getItem("user_customer_id"));
      this.defaultAuthToken = JSON.parse(
        localStorage.getItem("default_auth_token")
      );
      if (userID) {
        http
          .get("/customer/detail", {
            params: {
              id: userID
            }
          })
          .then(response => {
            this.formData = response.data.data.items[0];
            this.user.username = this.formData.username;
            this.user.userCode = this.formData.user_code;
            this.user.password = this.formData.password;
            this.user.fullname = this.formData.fullname;
            this.user.role = this.formData.role;
            this.user.email = this.formData.email;
            this.user.gender = this.formData.gender;
            this.user.birthDate = this.formData.birth_date;
            this.user.phoneNumber = this.formData.phone_number;
            this.user.address = this.formData.address;
            this.user.active = this.formData.active;
            this.user.avatarId = this.formData.avatar_id;
            this.user.fullAddress = this.formData.full_address;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getHistoryCart() {
      http
        .post("/orders/list", {
          customer_id: localStorage.getItem("user_customer_id")
        })
        .then(res => {
          this.cart = res.data.data.items;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCurrentCart() {
      http
        .post("/orders/list", {
          customer_id: localStorage.getItem("user_customer_id"),
          not_status: [4, 5]
        })
        .then(res => {
          this.currentCart = res.data.data.items;
        })
        .catch(err => {
          console.log(err);
        });
    },
    router(path) {
      this.$router.push({ path: path.code });
    },
    showUserInfo() {
      this.getInfoUser();
      this.getHistoryCart();
      this.getCurrentCart();
      this.isShowUserInfo = true;
    },
    logout() {
      localStorage.removeItem("user_customer_id");
      localStorage.removeItem("cart");
      localStorage.removeItem("default_auth_token");
      localStorage.removeItem("user_address");

      this.defaultAuthToken = "";
      this.onClose();
      EventBus.$emit("emptyCart");
      this.$notification["success"]({
        message: "Thông báo",
        description: "Bạn đã đăng xuất thành công!"
      });
    },
    onClose() {
      this.isShowUserInfo = false;
    },
    reload() {
      this.key++;
    },
    showFormEdit() {
      this.isShowFormEdit = true;
    },
    save() {
      var data = {
        role: this.user.role,
        username: this.user.username,
        avatar_id: this.user.avatarId,
        user_code: this.user.userCode,
        password: this.user.password,
        email: this.user.email,
        fullname: this.user.fullname,
        gender: this.user.gender,
        birth_date: this.user.birthDate,
        phone_number: this.user.phoneNumber,
        address: this.user.address,
        active: this.user.active
      };
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          http
            .post("/user/update", data, {
              params: {
                id: this.formData.id
              }
            })
            .then(response => {
              this.isShowFormEdit = false;
              this.$message.success("Lưu thành công");
            })
            .catch(error => {
              this.$message.error(error.message);
            });
          this.$emit("hideModal");
          this.$refs.ruleForm.resetFields();
        } else {
          this.$message.error("Tạo không thành công");
          return false;
        }
      });
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChangeFile(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.user.avatarId = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("Bạn chỉ được upload ảnh định dạng jpeg hoặc png");
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("Dung lượng ảnh không được quá 5MB");
      }
      return isJpgOrPng && isLt5M;
    },
    customRequest(options) {
      const fmData = new FormData();
      const { onSuccess, onError, file, onProgress } = options;
      fmData.append("file", file);
      http
        .post("/food/uploadFiles", fmData, {
          headers: { "content-type": "multipart/form-data" }
        })
        .then(response => {
          this.user.avatarId = response.data.data;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }
  },
  mounted() {
    this.getInfoUser();
  },
  created() {
    this.getTypeRestaurant();
    EventBus.$on("login", this.getInfoUser);
  },
  computed: {},
  mounted() {
    this.getInfoUser();
  }
};
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
.header-wrapper {
  display: flex;
  justify-content: space-between;
}
.header-left {
  display: flex;
  justify-content: space-between;
}
.header-right {
  display: flex;
  justify-content: space-between;
}
.header-icon-search {
  margin-right: 24px;
}
.logo {
  cursor: pointer;
}

.ant-menu-item.ant-menu-item-selected {
  font-weight: 700;
}
.btn-search {
  font-size: 24px;
  cursor: pointer;
}
.header-icon-search {
  display: flex;
  align-items: center;
}
.user-avatar {
  cursor: pointer;
}
.person-info {
  margin-bottom: 7px;
}
.person-info > span:nth-child(1) {
  color: rgba(0, 0, 0, 0.85);
  margin-right: 8px;
}
.group-button {
  position: absolute;
  bottom: 24px;
  background: #fff;
  width: 86%;
}
.ant-list-item-meta-description {
  font-size: 12px;
}
.history-order {
  border: 1px solid #eee;
  border-radius: 4px;
}

.history-order-content {
  border-bottom: 1px solid #eee;
}
.history-order-top,
.delivery-info,
.detail-history-order,
.detail-pay,
.history-order-footer {
  border-bottom: 1px solid #eee;
  padding: 10px 12px;
}
.history-order-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.history-order > .history-order-content {
  border: none;
}
.title {
  margin-bottom: 8px;
  color: rgb(158 158 158);
  font-weight: 700;
}
.restaurant-address {
  margin-bottom: 4px;
}
.restaurant-address,
.customer-address > span {
  font-size: 13px;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

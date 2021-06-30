<template>
  <div>
    <div class="cart">
      <a-list
        class="list-item"
        item-layout="horizontal"
        :data-source="cartData"
      >
        <div slot="header">
          <h3 :style="{ textAlign: 'left', fontWeight: '700' }">
            Chi tiết đơn hàng
          </h3>

          <div class="user">
            <span
              >Đơn hàng tạo bởi
              <span style="color: #0288d1">{{
                formData ? formData.fullname : ""
              }}</span></span
            >
            <span>{{ cartData.length }} món</span>
          </div>
        </div>
        <a-empty
          :image="simpleImage"
          v-if="cartData.length == 0"
          style="margin-top : 20px;margin-bottom : 0px"
          ><span slot="description">Giỏ hàng trống</span></a-empty
        >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta description="">
            <a slot="title">
              {{ item.title }}
            </a>
          </a-list-item-meta>
          <div class="cost">
            <span
              >{{
                Intl.NumberFormat("vi-VN").format(
                  Number.parseFloat(
                    item.cost - (item.cost * item.discount) / 100
                  ).toFixed(0)
                )
              }}đ</span
            >
            <div class="quantity-wrapper">
              <a-button @click="minusItemInCart(index)"
                ><a-icon type="minus"
              /></a-button>
              <span>{{ item.quantity }}</span>
              <a-button @click="plusItemInCart(index)"
                ><a-icon type="plus"
              /></a-button>
            </div>
          </div>
        </a-list-item>
        <div slot="footer">
          <div class="bill">
            <span>Tổng cộng</span>
            <span
              >{{
                Intl.NumberFormat("vi-VN").format(
                  Number.parseFloat(cost).toFixed(0)
                )
              }}đ</span
            >
          </div>
          <a-button type="danger" style="width: 100%" @click="showOrderDetail">
            <a-icon type="check-circle" theme="filled" />
            Đặt hàng</a-button
          >
        </div>
      </a-list>
    </div>
    <div class="order-detail" v-if="customerId">
      <a-modal
        title="Xác nhận đơn hàng"
        v-model="orderDetailVisible"
        :width="900"
        :bodyStyle="{ padding: '8px', height: '500px', overflow: 'auto' }"
      >
        <div slot="footer">
          <a-button type="primary" :style="{ width: '100%' }" @click="order"
            >Đặt hàng</a-button
          >
        </div>
        <a-row>
          <a-col :span="10">
            <div style="height : 300px;border : 1px solid #eee">
              <open-street-map :waypoints="waypoints"></open-street-map>
            </div>
            <div class="direction-content">
              <div class="direction-info">
                <div class="direction-from">
                  <div class="direction-name">{{ restaurantData.title }}</div>
                  <span>
                    {{ restaurantData.full_address }}
                  </span>
                </div>
                <div class="direction-to">
                  <div class="">
                    <div class="direction-name" id="shipping-address">
                      <span>{{ formData ? formData.fullname : "" }}</span
                      ><span>
                        - {{ formData ? formData.phone_number : "" }}
                      </span>
                    </div>
                    <div class="direction-address">
                      <span> {{ customerAddress.address }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="direction-time">
                  <a-icon type="clock-circle" /><span class="txt-bold">
                    Dự kiến:
                    {{
                      moment()
                        .add(15, "minute")
                        .format("HH:mm - DD/MM")
                    }}
                    -
                  </span>
                  <span style="color: red">
                    {{ Number.parseFloat(calcDistance).toFixed(2) }} km</span
                  >
                </div>
                <div class="change-info-location">
                  <span @click="showFormChangeInfo"
                    >Thay đổi địa điểm nhận hàng</span
                  >
                  <a-modal
                    title="Sửa thông tin địa điểm giao hàng"
                    v-model="locationVisible"
                    :width="900"
                    :bodyStyle="{ padding: '8px', height: '550px' }"
                    :footer="false"
                  >
                    <a-list
                      class="discount-code-list"
                      item-layout="horizontal"
                      :data-source="listAddress"
                    >
                      <div slot="header">
                        <div class="modal-order-promo-code__title">
                          <span>Chọn địa điểm giao hàng</span>

                          <a-button @click="showMap"
                            >Thêm địa chỉ <a-icon type="plus" />
                          </a-button>
                          <a-modal
                            title="Bạn muốn giao đến đâu ?"
                            v-model="mapVisible"
                            :width="900"
                            :bodyStyle="{ padding: '8px', height: '550px' }"
                          >
                            <template slot="footer">
                              <a-button
                                type="primary"
                                style="width: 100%"
                                @click="addMarker"
                                >Xong</a-button
                              >
                            </template>
                            <GoogleMap @addToListAddress="fetchListAddress" />
                          </a-modal>
                        </div>
                      </div>
                      <a-list-item slot="renderItem" slot-scope="item">
                        <a slot="actions">
                          <a-button type="primary" @click="setAddress(item)"
                            >Áp dụng</a-button
                          >
                        </a>
                        <a-list-item-meta :description="item.address">
                          <a slot="title"
                            >{{ formData.fullname }} -
                            {{ formData.phone_number }}</a
                          >
                          <a-avatar slot="avatar" icon="environment" />
                        </a-list-item-meta>
                      </a-list-item>
                    </a-list>
                  </a-modal>
                </div>
              </div>
            </div>
          </a-col>
          <a-col :span="1"></a-col>
          <a-col :span="13">
            <a-list
              class="list-item"
              item-layout="horizontal"
              :data-source="cartData"
            >
              <div slot="header" class="cart-header">
                <h3>Chi tiết đơn hàng</h3>
              </div>
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta description="">
                  <a
                    slot="title"
                    style="
                      font-size: 12px;
                      text-align: center;
                      color: #fff;
                      display: block;
                      width: 15px;
                      height: 15px;
                      background-color: #0288d1;
                      line-height: 14px;
                      border-radius: 4px;
                      margin-right: 4px;
                    "
                    >{{ item.quantity }}</a
                  >
                  <a slot="title">
                    {{ item.title }}
                  </a>
                </a-list-item-meta>
                <div class="cost">
                  <span
                    >{{
                      Intl.NumberFormat("vi-VN").format(
                        Number.parseFloat(
                          item.cost - (item.cost * item.discount) / 100
                        ).toFixed(0)
                      )
                    }}đ</span
                  >
                </div>
              </a-list-item>
              <div slot="footer">
                <div class="info-order">
                  <a-col>
                    <a-row>
                      <div class="bill">
                        <span>Tổng cộng {{ cartData.length }} phần</span>
                        <span
                          >{{
                            Intl.NumberFormat("vi-VN").format(
                              Number.parseFloat(cost).toFixed(0)
                            )
                          }}đ</span
                        >
                      </div>
                    </a-row>
                    <a-row>
                      <div class="bill">
                        <span>Phí vận chuyển</span>
                        <span
                          >{{
                            Intl.NumberFormat("vi-VN").format(
                              Number.parseFloat(ship).toFixed(0)
                            )
                          }}đ</span
                        >
                      </div>
                    </a-row>
                    <a-row>
                      <div class="bill" v-if="discount">
                        <span>Khuyến mãi</span>

                        <span
                          >-{{
                            Intl.NumberFormat("vi-VN").format(
                              Number.parseFloat(discount).toFixed(0)
                            )
                          }}đ</span
                        >
                      </div>
                    </a-row>
                  </a-col>
                </div>
                <div class="discount-code">
                  <a-row>
                    <a-col>
                      <div class="code">
                        <span>Mã khuyến mãi</span>
                        <span v-if="discount">{{ discountCode }}</span>
                        <a @click="showDiscountCode">Xem mã giảm giá</a>
                        <a-modal
                          title="Khuyến mãi"
                          v-model="discountCodeVisible"
                          :width="900"
                          :bodyStyle="{ padding: '8px', height: '550px' }"
                          :footer="false"
                        >
                          <a-list
                            class="discount-code-list"
                            item-layout="horizontal"
                            :data-source="discountCodeData"
                          >
                            <div slot="header">
                              <div class="modal-order-promo-code__title">
                                Mã khuyến mãi của nhà hàng
                              </div>
                            </div>
                            <a-list-item slot="renderItem" slot-scope="item">
                              <a slot="actions">
                                <a-button
                                  type="primary"
                                  @click="applyDiscountCode(item)"
                                  >Áp dụng</a-button
                                >
                              </a>
                              <a-list-item-meta :description="item.content">
                                <a slot="title">{{ item.code }}</a>
                                <a-avatar slot="avatar" icon="gift" />
                              </a-list-item-meta>
                              <div>
                                <span style="margin-right: 16px"
                                  >Giảm giá :
                                  <span style="font-weight: 700"
                                    >{{
                                      Intl.NumberFormat("vi-VN").format(
                                        Number.parseFloat(
                                          item.discount
                                        ).toFixed(0)
                                      )
                                    }}đ</span
                                  ></span
                                >
                                <span
                                  >Đặt tối thiểu :
                                  <span style="font-weight: 700"
                                    >{{
                                      Intl.NumberFormat("vi-VN").format(
                                        Number.parseFloat(
                                          item.min_total_order
                                        ).toFixed(0)
                                      )
                                    }}đ</span
                                  ></span
                                >
                              </div>
                            </a-list-item>
                          </a-list>
                        </a-modal>
                      </div>
                    </a-col>
                  </a-row>
                </div>
                <div class="total_order">
                  <a-col>
                    <a-row>
                      <div class="bill">
                        <span
                          style="
                            font-weight: 700;
                            color: black;
                            font-size: 18px;
                          "
                          >Tổng cộng :</span
                        >
                        <span
                          >{{
                            Intl.NumberFormat("vi-VN").format(
                              Number.parseFloat(grandTotal).toFixed(0)
                            )
                          }}đ</span
                        >
                      </div>
                    </a-row>
                  </a-col>
                </div>
              </div>
            </a-list>
          </a-col>
        </a-row>
      </a-modal>
    </div>
  </div>
</template>
<script>
import EventBus from "../../event-bus";
import http from "../../http-common";
import moment from "moment";
// import utils from "./../../utils";
import GoogleMap from "../GoogleMap";
import Osm from "../../components/Maps/OpenStreetMap";
import mixin from "./../../mixin";
import { Empty } from "ant-design-vue";
export default {
  mixins: [mixin],
  props: {
    id: Number,
    restaurantData: Object,
    discountCodeData: Array
  },
  components: {
    GoogleMap,
    "open-street-map": Osm
  },
  data() {
    let customerAddress = JSON.parse(localStorage.getItem("user_address"));
    let listAddress = [customerAddress];
    let customerId = JSON.parse(localStorage.getItem("user_customer_id"));
    let restaurantInfo = JSON.parse(
      localStorage.getItem("client_restaurant_info")
    );
    let waypoints = [
      { lat: restaurantInfo.latitude, lng: restaurantInfo.longitude },
      { lat: customerAddress.marker.lat, lng: customerAddress.marker.lng }
    ];
    return {
      moment,
      cartData: [],
      key: 0,
      cost: 0,
      ship: 20000,
      formData: {},
      userID: null,
      orderDetailVisible: false,
      discountCodeVisible: false,
      discount: null,
      grandTotal: null,
      discountCode: "",
      customerAddress,
      listAddress,
      center: { lat: 21.0278, lng: 105.8342 },
      markers: {
        position: {
          lat: this.restaurantData.latitude,
          lng: this.restaurantData.longitude
        }
      },
      locationVisible: false,
      mapVisible: false,
      customerId,
      waypoints
    };
  },
  computed: {
    calcDistance() {
      return this.distanceInKmBetweenEarthCoordinates(
        this.customerAddress.marker.lat,
        this.customerAddress.marker.lng,
        this.restaurantData.latitude,
        this.restaurantData.longitude
      );
    }
  },
  methods: {
    setAddress(data) {
      localStorage.removeItem("user_address");
      localStorage.setItem("user_address", JSON.stringify(data));
      this.customerAddress = JSON.parse(localStorage.getItem("user_address"));
      this.locationVisible = false;
    },
    fetchListAddress(data) {
      this.listAddress.push(data);
    },
    addMarker() {
      EventBus.$emit("addMarker");
      this.mapVisible = false;
    },
    showMap() {
      this.mapVisible = true;
    },
    showFormChangeInfo() {
      this.locationVisible = true;
    },
    degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
    },

    distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
      var earthRadiusKm = 6371;

      var dLat = this.degreesToRadians(lat2 - lat1);
      var dLon = this.degreesToRadians(lon2 - lon1);

      lat1 = this.degreesToRadians(lat1);
      lat2 = this.degreesToRadians(lat2);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadiusKm * c;
    },
    order() {
      let data = {
        // order_code: "T-" + Math.random().toString(18).substring(4),
        order_code: Math.floor(Math.random() * (100000 - 1)) + 1,
        customer_id: this.formData.id,
        restaurant_id: this.restaurantData.id,
        drive_id: null,
        delivery_order_id: null,
        status: 1,
        shipping: this.ship,
        promo: this.discount,
        fee: null,
        grand_total: this.grandTotal,
        location_destination: this.restaurantData.full_address,
        location_arrival: this.customerAddress.address,
        distant: this.calcDistance,
        create_at: moment(),
        update_at: moment(),
        content: null
      };

      http
        .post("/orders/save", data)
        .then(res => {
          if (res.data.errorCode == 1) {
            var orderId = res.data.data.insertId;
            if (orderId) {
              let itemData = this.cartData.map(d => {
                return {
                  order_id: orderId,
                  food_id: d.restaurant_food_id ? d.id : null,
                  price: d.cost,
                  discount: d.discount,
                  quantity: d.quantity,
                  combo_id : !d.restaurant_food_id ? d.id : null
                };
              });
              itemData.forEach(item => {
                http
                  .post("/order-item/save", item)
                  .then(response => {
                    if (res.data.errorCode == 1) {
                    } else {
                      console.log();
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            }
            this.$message.success("Đặt hàng thành công");
            this.orderDetailVisible = false;
            localStorage.removeItem("cart");
            this.fetchData();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    applyDiscountCode(value) {
      if (
        this.calcDistance <= value.max_distance ||
        this.cost >= value.min_total_order
      ) {
        this.discount = value.discount;
        this.discountCode = value.code;
        this.showOrderDetail();
        this.discountCodeVisible = false;
      }else {
        this.$notification['warning']({
        message: 'Thông báo',
        description:
          'Đơn hàng chưa đủ điều kiện sử dụng ưu đãi',
      });
      }
    },
    showDiscountCode() {
      this.discountCodeVisible = true;
    },
    showOrderDetail() {
      let defaultToken = JSON.parse(localStorage.getItem("default_auth_token"));
      if (defaultToken) {
        if (this.cartData.length) {
          if (
            this.cartData.filter(
              item => item.restaurant_id == this.restaurantData.id
            ).length == 0
          ) {
            this.$notification["warning"]({
              message: "Thông báo",
              description:
                "Bạn không thể đặt hàng do giỏ hàng hiện tại đang của một nhà hàng khác . Vui lòng thử lại sau !"
            });
          } else {
            this.orderDetailVisible = true;
            if (this.discount) {
              this.grandTotal = this.cost + this.ship - this.discount;
            } else {
              this.grandTotal = this.cost + this.ship;
            }
          }
        } else {
          this.$notification["warning"]({
            message: "Thông báo",
            description: "Vui lòng chọn món"
          });
        }
      } else {
        this.$notification["warning"]({
          message: "Cảnh báo đăng nhập",
          description:
            "Bạn phải thực hiện đăng nhập trước khi tiến hành đặt hàng."
        });
        this.$router.push("/login");
      }
    },
    fetchData() {
      this.cost = 0;
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      this.userID = JSON.parse(localStorage.getItem("user_customer_id"));
      if (this.userID) {
        this.getUserInfo(this.userID);
      } else {
        this.formData = {};
      }

      this.cartData = JSON.parse(localStorage.getItem("cart"));
      this.cartData.forEach(d => {
        return (this.cost +=
          d.quantity * (d.cost - (d.cost * d.discount) / 100));
      });
    },
    reload() {
      this.fetchData();
    },
    minusItemInCart(index) {
      if (this.cartData[index].quantity > 1) {
        this.cartData[index].quantity -= 1;
      } else {
        this.cartData.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(this.cartData));
      this.reload();
    },
    plusItemInCart(index) {
      this.cartData[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(this.cartData));
      this.reload();
    },
    getUserInfo(value) {
      http
        .get("/customer/detail", {
          params: {
            id: value
          }
        })
        .then(resp => {
          this.formData = resp.data.data.items[0];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    this.fetchData();
    EventBus.$on("reload", this.reload);
    EventBus.$on("emptyCart", this.fetchData);
  },
  destroyed() {
    EventBus.$off("reload", this.reload);
    EventBus.$off("emptyCart", this.fetchData);
  },
  mounted() {
    this.getUserInfo(this.userID);
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  }
};
</script>
<style scoped>
.ant-list-item-meta-title {
  margin-bottom: 0px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 11px;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
}
.cost {
  display: flex;
  flex-direction: column;
}
.cost span {
  font-size: 13px;
}
.cart-header h3 {
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  margin-bottom: 8px;
}
.user > span:nth-child(1) {
  font-style: italic;
  text-align: left;
  font-size: 11px;
  display: block;
}
.cart {
  padding: 8px 16px;
  background-color: #fff;
}
.user {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user span:nth-child(2) {
  font-weight: 700;
  margin-left: 8px;
  color: #000;
}
.bill {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin: 8px 0;
}
.bill span:nth-child(2) {
  color: #0288d1;
  font-weight: 700;
}
.bill span:nth-child(3) {
  color: #0288d1;
  font-weight: 700;
}
.code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  background: #fbf9d8;
}
.code > span:nth-child(2) {
  color: white;
  background-color: red;
  border-radius: 4px;
  padding: 2px 4px;
}
.quantity-wrapper {
  margin-top: 4px;
}
.quantity-wrapper > .ant-btn {
  height: 20px;
  padding: 0;
}
.quantity-wrapper > span {
  padding: 0 4px;
}
.direction-content {
  padding-left: 10px;
  border-top: 0;
  margin-top: 8px;
}
.direction-info {
  padding: 5px 10px 5px 23px;
  overflow: hidden;
}
.direction-from {
  padding: 5px 0;
  position: relative;
}
.direction-to {
  padding: 5px 0;
  position: relative;
}
.direction-from:before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 1px;
  background-color: #d7d7d7;
  left: -14px;
  top: 16px;
  height: 50px;
}
.direction-from:after,
.direction-to:after {
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #6cc942;
  margin: auto;
  position: absolute;
  top: 9px;
  left: -19px;
}
.direction-name {
  font-size: 13px;
  font-weight: 700;
  line-height: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 96%;
}

.direction-address {
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.direction-time {
  border: 1px solid #464646;
  border-radius: 12px;
  display: inline-block;
  padding: 2px 3px;
  background-color: #fbf9d8;
}
.txt-bold {
  font-weight: 700 !important;
}

.change-info-location {
  font-size: 14px;
  color: #0288d1;
  padding: 10px 0;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ant-list-item-meta-title {
  display: flex;
  align-items: center;
}
.restaurant-avatar {
  width: 100%;
}
.cart-header {
  margin-top: -4px;
}
.modal-order-promo-code__title {
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 600;
  color: #363636;
  background: #ebebeb;
  margin-bottom: -12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

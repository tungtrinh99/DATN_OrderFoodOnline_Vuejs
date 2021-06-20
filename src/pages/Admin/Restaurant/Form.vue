<template>
  <div>
    <a-form-model
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :model="restaurant"
      :rules="rules"
      ref="ruleForm"
    >
      <a-form-model-item label="Ảnh quán ăn" prop="avatar_id">
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
            v-if="restaurant.avatar_id"
            :src="require('../../../../public/images/' + restaurant.avatar_id)"
            alt="file"
            :style="{ width: '120px', height: '120px' }"
          />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Tải ảnh quán ăn</div>
          </div>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label="Tên quán " ref="title" prop="title">
        <a-input v-model="restaurant.title" type="text" :allowClear="true" />
      </a-form-model-item>
      <a-form-model-item label="Giờ mở cửa" ref="opentime" prop="opentime">
        <a-time-picker placeholder="Chọn giờ" v-model="restaurant.opentime" />
      </a-form-model-item>
      <a-form-model-item label="Giờ đóng cửa" ref="closetime" prop="closetime">
        <a-time-picker placeholder="Chọn giờ" v-model="restaurant.closetime" />
      </a-form-model-item>

      <a-form-model-item label="Địa chỉ" ref="location_id" prop="location_id">
        <div class="select">
          <a-select
            show-search
            :value="restaurant.location_id"
            placeholder="Vui lòng chọn địa chỉ quán"
            style="width: 100%"
            :default-active-first-option="false"
            :show-arrow="true"
            :filter-option="false"
            :allowClear="true"
            @focus="getListLocation"
            @change="handleChange"
          >
            <a-select-option v-for="d in listLocation" :key="d.id">
              {{ d.full_address }}
            </a-select-option>
          </a-select>
          <a-button
            @click="showLocation"
            :style="
              `
                border-left:none;
                margin-left:-5px;
                border-top-left-radius:0;
                border-bottom-left-radius:0`
            "
          >
            <a-icon type="environment" />
          </a-button>
        </div>
      </a-form-model-item>
      <a-form-model-item label="Số điện thoại" ref="phone_res" prop="phone_res">
        <a-input
          v-model="restaurant.phone_number"
          type="text"
          :allowClear="true"
        />
      </a-form-model-item>
      <a-form-model-item label="Người dùng" ref="user" prop="user">
        <div class="select">
          <a-select
            show-search
            :value="restaurant.user_id"
            placeholder="Vui lòng chọn người dùng"
            style="width: 100%; border-left: none"
            :default-active-first-option="false"
            :show-arrow="true"
            :filter-option="false"
            :allowClear="true"
            @focus="getListUser"
            @change="handleChangeUser"
          >
            <a-select-option v-for="d in listUser" :key="d.id">
              {{ d.fullname + " " + d.username }}
            </a-select-option>
          </a-select>
          <a-button
            @click="showUser"
            :style="
              `
                border-left:none;
                margin-left:-5px;
                border-top-left-radius:0;
                border-bottom-left-radius:0`
            "
          >
            <a-icon type="user" />
          </a-button>
        </div>
      </a-form-model-item>
      <a-form-model-item label="Kiểu quán" ref="type" prop="type">
        <a-select
          show-search
          :value="restaurant.type_id"
          placeholder="Vui lòng chọn kiểu quán"
          style="width: 100%"
          :default-active-first-option="false"
          :show-arrow="true"
          :filter-option="false"
          :not-found-content="null"
          :allowClear="true"
          @focus="getListTypeRestaurant"
          @change="handleChangeType"
        >
          <a-select-option v-for="d in listTypeRestaurant" :key="d.id">
            {{ d.title }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <a-modal
      v-model="visibleUser"
      :title="'Đối tác'"
      okText="Lưu"
      cancelText="Hủy"
      @ok="saveUser"
      :bodyStyle="{
        padding: '16px',
        height: '70vh',
        overflow: 'auto'
      }"
    >
      <user-form :entity="'merchant'" @hideModal="hideModal"></user-form>
    </a-modal>
    <a-modal
      v-model="visibleLocation"
      :title="'Địa chỉ'"
      okText="Lưu"
      cancelText="Hủy"
      @ok="saveLocation"
      :bodyStyle="{
        padding: '16px',
        height: '70vh',
        overflow: 'auto'
      }"
    >
      <location-form
        :entity="'location'"
        @hideModal="hideModal"
      ></location-form>
    </a-modal>
  </div>
</template>
<script>
import http from "../../../http-common";
import EventBus from "../../../event-bus";
import RuleConfig from "../../../common/RuleConfig";
import moment from "moment";
import mixin from "../../../mixin";
import UserForm from "../../../pages/Admin/Merchant/Form.vue";
import LocationForm from "../../../pages/Admin/Location/Form.vue";
export default {
  mixins: [mixin],
  created() {
    EventBus.$on("save", this.save);
  },
  destroyed() {
    EventBus.$off("save", this.save);
  },
  components: {
    UserForm,
    LocationForm
  },
  props: {
    entity: String
  },
  data() {
    let rules = RuleConfig[this.entity];
    let restaurant = {
      title: "",
      opentime: moment(),
      closetime: moment(),
      phone_number: null,
      location_id: "",
      avatar_id: "",
      type_id: "",
      user_id: null
    };
    return {
      moment,
      restaurant,
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      loading: false,
      imageUrl: "",
      listLocation: [],
      listTypeRestaurant: [],
      listUser: [],
      visibleUser: false,
      visibleLocation: false
    };
  },
  methods: {
    hideModal() {
      this.visibleUser = false;
      this.visibleLocation = false;
    },
    saveUser() {
      EventBus.$emit("saveUserFromRestaurantForm");
    },
    saveLocation() {
      EventBus.$emit("saveLocationFromRestaurantForm");

    },
    showUser() {
      this.visibleUser = true;
    },
    showLocation() {
      this.visibleLocation = true;
    },
    save() {
      var data = {
        title: this.restaurant.title,
        opentime: this.restaurant.opentime,
        closetime: this.restaurant.opentime,
        phone_number: this.restaurant.phone_number,
        avatar_id: this.restaurant.avatar_id,
        type_id: this.restaurant.type_id,
        slug: this.convertSlug(this.restaurant.title),
        location_id: this.restaurant.location_id,
        user_id: this.restaurant.user_id
      };
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          http
            .post(`/${this.entity}/save`, data)
            .then(response => {
              this.$message.success("Tạo thành công");
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
    getListLocation() {
      http
        .post("/location/list")
        .then(response => {
          this.listLocation = response.data.data.items;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getListUser() {
      http
        .post("/merchant/list", {
          active: 0
        })
        .then(response => {
          this.listUser = response.data.data.items;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getListTypeRestaurant() {
      http
        .get("/restaurant-type/list")
        .then(response => {
          this.listTypeRestaurant = response.data.data.items;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    handleChange(value) {
      this.restaurant.location_id = value;
    },

    handleChangeType(value) {
      this.restaurant.type_id = value;
    },
    handleChangeUser(value) {
      this.restaurant.user_id = value;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
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
          this.restaurant.avatar_id = imageUrl;
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
          this.restaurant.avatar_id = response.data.data;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }
  },
  mounted() {}
};
</script>
<style scoped>
.select {
  display: flex;
  position: relative;
}
</style>

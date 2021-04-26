<template>
  <a-form-model
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="restaurant"
    :rules="rules"
    ref="ruleForm"
  >
    <a-form-model-item label="Ảnh nhà hàng" prop="avatar_id">
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
    <a-form-model-item label="Tên nhà hàng" ref="title" prop="title">
      <a-input v-model="restaurant.title" type="text" :allowClear="true" />
    </a-form-model-item>
    <a-form-model-item label="Giờ mở cửa" ref="opentime" prop="opentime">
      <a-time-picker placeholder="Chọn giờ" v-model="restaurant.opentime" />
    </a-form-model-item>
    <a-form-model-item label="Giờ đóng cửa" ref="closetime" prop="closetime">
      <a-time-picker placeholder="Chọn giờ" v-model="restaurant.closetime" />
    </a-form-model-item>
    <a-form-model-item label="Chủ quán" ref="user" prop="user">
      <a-select
        show-search
        :value="restaurant.user_id"
        placeholder="Vui lòng chọn chủ quán"
        style="width: 100%"
        :default-active-first-option="false"
        :show-arrow="true"
        :filter-option="false"
        :not-found-content="null"
        :allowClear="true"
        @change="handleChangeUser"
      >
        <a-select-option v-for="d in listUser" :key="d.id">
          {{ d.user_code + "-" + d.fullname }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Địa chỉ" ref="location_id" prop="location_id">
      <a-select
        show-search
        :value="restaurant.location_id"
        placeholder="Vui lòng chọn địa chỉ quán"
        style="width: 100%"
        :default-active-first-option="false"
        :show-arrow="true"
        :filter-option="false"
        :not-found-content="null"
        :allowClear="true"
        @change="handleChange"
      >
        <a-select-option v-for="d in listLocation" :key="d.id">
          {{ d.full_address }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Số điện thoại" ref="phone_res" prop="phone_res">
      <a-input
        v-model="restaurant.phone_number"
        type="text"
        :allowClear="true"
      />
    </a-form-model-item>
    <a-form-model-item label="Kiểu quán" ref="type" prop="type">
      <a-select
        show-search
        :value="restaurant.type_id"
        :default-value="{ key: restaurant.type_id }"
        placeholder="Vui lòng chọn kiểu quán"
        style="width: 100%"
        :default-active-first-option="false"
        :show-arrow="true"
        :filter-option="false"
        :not-found-content="null"
        :allowClear="true"
        @change="handleChangeType"
      >
        <a-select-option v-for="d in listTypeRestaurant" :key="d.id">
          {{ d.title }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Địa chỉ tìm kiếm" ref="slug" prop="slug">
      <a-input v-model="restaurant.slug" type="text" disabled />
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import http from "../../../http-common";
import EventBus from "../../../event-bus";
import RuleConfig from "../../../common/RuleConfig";
import moment from "moment";
export default {
  created() {
    EventBus.$on("saveEdit", this.save);
    EventBus.$on("data", this.fetchDataEdit);
    this.getListUser();
    this.getListLocation();
    this.getListTypeRestaurant();
  },
  destroyed() {
    EventBus.$on("saveEdit", this.save);
    EventBus.$off("data", this.fetchDataEdit);
  },
  props: {
    entity: String,
    id: Number,
  },
  data() {
    var rules = RuleConfig[this.entity];
    return {
      restaurant: {
        title: "",
        opentime: "",
        closetime: "",
        user_id: "",
        phone_number: null,
        location_id: "",
        avatar_id: "",
        type_id: "",
        slug: "",
      },
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      data: [],
      loading: false,
      imageUrl: "",
      dateFormatList: ["DD/MM/YYYY", "DD/MM/YY"],
      listLocation:[],
      listUser:[],
      listTypeRestaurant:[]
    };
  },
  methods: {
    moment,
    fetchDataEdit(data) {
      this.restaurant.title = data.title;
      this.restaurant.opentime = moment(data.opentime,"HH:mm:ss");
      this.restaurant.closetime = moment(data.closetime,"HH:mm:ss");
      this.restaurant.user_id = data.user_id;
      this.restaurant.phone_number = data.phone_number;
      this.restaurant.location_id = data.location_id;
      this.restaurant.avatar_id = data.avatar_id;
      this.restaurant.type_id = data.type_id;
      this.restaurant.slug = data.slug;
    },
    save() {
      var data = {
        title: this.restaurant.title,
        opentime: this.restaurant.opentime,
        closetime: this.restaurant.closetime,
        user_id: this.restaurant.user_id,
        phone_number: this.restaurant.phone_number,
        location_id: this.restaurant.location_id,
        avatar_id: this.restaurant.avatar_id,
        type_id: this.restaurant.type_id,
        slug: this.restaurant.slug,
      };
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          http
            .post("/restaurant/update", data, {
              params: {
                id: this.id,
              },
            })
            .then((response) => {
              this.$emit("hideModal");
              this.$message.success("Lưu thành công");
            })
            .catch((error) => {
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
        .get("/location/list")
        .then((response) => {
          this.listLocation = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    getListUser() {
      http
        .get("/user/list", {
          params: {
            id: 4,
          },
        })
        .then((response) => {
          this.listUser = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    getListTypeRestaurant() {
      http
        .get("/restaurant-type/list")
        .then((response) => {
          this.listTypeRestaurant = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    handleChange(value) {
      this.restaurant.location_id = value;
    },
    handleChangeUser(value) {
      this.restaurant.user_id = value;
    },
    handleChangeType(value) {
      this.restaurant.type_id = value;
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
        getBase64(info.file.originFileObj, (imageUrl) => {
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
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          this.user.avatarId = response.data.data;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
  },
  mounted() {},
};
</script>

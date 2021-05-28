<template>
  <a-form-model
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="user"
    :rules="rules"
    ref="ruleForm"
  >
    <a-form-model-item label="Ảnh khách hàng" prop="avatar">
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
          :src="require('../../../../public/images/' + user.avatarId)"
          alt="file"
          :style="{ width: '120px', height: '120px' }"
        />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">Tải ảnh sản phẩm</div>
        </div>
      </a-upload>
    </a-form-model-item>
    <a-form-model-item label="Mã khách hàng" ref="userCode" prop="user_code">
      <a-input v-model="user.userCode" type="text" :allowClear="true" />
    </a-form-model-item>
    <a-form-model-item label="Tên khách hàng" ref="fullname" prop="fullname">
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
      <a-date-picker v-model="user.birthDate" type="date" format="DD-MM-YYYY" />
    </a-form-model-item>
    <a-form-model-item label="Giới tính" ref="gender" prop="gender">
      <a-select
        :value="user.gender"
        style="width: 120px"
        @change="handleChangeGender"
      >
        <a-select-option :key="1"> Nam </a-select-option>
        <a-select-option :key="2"> Nữ </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item
      label="Số điện thoại"
      ref="phoneNumber"
      prop="phone_number"
    >
      <a-input v-model="user.phoneNumber" type="text" :allowClear="true" />
    </a-form-model-item>
    <a-form-model-item label="Địa chỉ" ref="location_id" prop="location_id">
      <div class="select">
        <a-select
          show-search
          :value="user.address"
          placeholder="Vui lòng chọn địa chỉ quán"
          style="width: 100%; border-left: none"
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
        <a-button
          @click="showUser"
          :style="`
                border-left:none;
                margin-left:-5px;
                border-top-left-radius:0;
                border-bottom-left-radius:0`"
        >
          <a-icon type="environment" />
        </a-button>
      </div>
    </a-form-model-item>
    
  </a-form-model>
</template>
<script>
import http from "../../../http-common";
import EventBus from "../../../event-bus";
import RuleConfig from "../../../common/RuleConfig";
import moment from "moment";
const bcrypt = require("bcryptjs");

export default {
  created() {
    this.getListLocation();
    EventBus.$on("saveEdit", this.save);
    EventBus.$on("data", this.fetchDataEdit);
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
        role: 4,
      },
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      data: [],
      loading: false,
      imageUrl: "",
      dateFormatList: ["DD/MM/YYYY", "DD/MM/YY"],
      listLocation: [],
    };
  },
  methods: {
    moment,
    showUser() {},
    getListLocation() {
      http
        .post("/location/list")
        .then((response) => {
          this.listLocation = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    handleChange(value) {
      this.user.address = value;
    },
    handleChangeGender(value) {
      this.user.gender = value;
    },
    onChangeDate(date, dateString) {
      this.user.birthDate = dateString;
    },
    fetchDataEdit(data) {
      this.user.username = data.username;
      this.user.userCode = data.user_code;
      this.user.fullname = data.fullname;
      this.user.role = data.role;
      this.user.email = data.email;
      this.user.gender = data.gender;
      this.user.birthDate = data.birth_date;
      this.user.phoneNumber = data.phone_number;
      this.user.address = data.address;
      this.user.active = data.active;
      this.user.avatarId = data.avatar_id;
    },
    save() {
      var data = {
        role: this.user.role,
        username: this.user.username,
        avatar_id: this.user.avatarId,
        user_code: this.user.userCode,
        password: bcrypt.hashSync(this.user.password, 8),
        email: this.user.email,
        fullname: this.user.fullname,
        gender: this.user.gender,
        birth_date: this.user.birthDate,
        phone_number: this.user.phoneNumber,
        address: this.user.address,
        active: this.user.active,
      };
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          http
            .post("/user/update", data, {
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
<style scoped>
.select {
  display: flex;
  position: relative;
}
</style>

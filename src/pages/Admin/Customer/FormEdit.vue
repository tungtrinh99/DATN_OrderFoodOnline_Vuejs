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
    
    <a-form-model-item label="Mật khẩu" ref="password" prop="password">
      <a-input-password v-model="user.password"   />
    </a-form-model-item>
    <a-form-model-item label="Email" ref="email" prop="email">
      <a-input v-model="user.email" type="text" :allowClear="true" />
    </a-form-model-item>
    <a-form-model-item label="Ngày sinh" ref="birthDate" prop="birth_date">
      <a-date-picker v-model="user.birthDate" type="date" format="DD-MM-YYYY"/>
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
    <a-form-model-item label="Trạng thái" ref="active" prop="active">
      <a-input-number
        :min="0"
        :max="1"
        v-model="user.active"
        :style="{ width: '50%' }"
      />
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
      },
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      data: [],
      loading: false,
      imageUrl: "",
      dateFormatList: ["DD/MM/YYYY", "DD/MM/YY"],
    };
  },
  methods: {
    moment,
    onChangeDate(date, dateString){
      this.user.birthDate = dateString;
    },
    fetchDataEdit(data) {
      this.user.userCode = data.user_code;
      this.user.password = data.password;
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
        avatar_id: this.user.avatarId,
        user_code: this.user.userCode,
        password: this.user.password,
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

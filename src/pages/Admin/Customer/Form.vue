<template>
  <div>
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
    <a-form-model-item label="Mã khách hàng" ref="userCode" prop="usercode">
      <a-input
        v-model="user.userCode"
        type="text"
        :allowClear="true"
        :disabled="true"
      />
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
      <a-date-picker v-model="user.birthDate" type="date" format="DD-MM-YYYY" :locale="locale" />
    </a-form-model-item>
     <a-form-model-item label="Giới tính" ref="gender" prop="gender">
      <a-select
        :value="user.gender"
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
          placeholder="Vui lòng chọn địa chỉ"
          style="width: 100%; border-left: none"
          :default-active-first-option="false"
          :show-arrow="true"
          :filter-option="false"
          :not-found-content="null"
          :allowClear="true"
          @change="handleChange"
          @focus="getListLocation"

        >
          <a-select-option v-for="d in listLocation" :key="d.id">
            {{ d.full_address }}
          </a-select-option>
        </a-select>
        <a-button
          @click="showLocation"
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
import locale from "ant-design-vue/es/date-picker/locale/vi_VN";
import http from "../../../http-common";
import EventBus from "../../../event-bus";
import RuleConfig from "../../../common/RuleConfig";
import moment from "moment";
import LocationForm from "../../../pages/Admin/Location/Form.vue";
const bcrypt = require('bcryptjs');
 
export default {
  created() {
    this.getListLocation();
    EventBus.$on("save", this.save);
  },
  destroyed() {
    EventBus.$off("save", this.save);
  },
  props: {
    entity: String,
    roleNumber: Number,
  },
  components:{
    LocationForm
  },
  data() {
    var rules = RuleConfig[this.entity];
    var userCode = `KH000` + Math.floor(Math.random() * 1000 + 1);
    let user = {
      username: "",
      userCode: userCode,
      password: "",
      email: "",
      fullname: "",
      gender: null,
      birthDate:moment(new Date(), "DD-MM-YYYY"),
      phoneNumber: "",
      address: "",
      active: 1,
      avatarId: "",
      role:2,
    };
    return {
      moment,
      user,
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      loading: false,
      imageUrl: "",
      listLocation:[],
      locale,
      visibleLocation : false

    };
  },
  methods: {
    showLocation(){
      this.visibleLocation= true;
    },
    hideModal() {
      this.visibleLocation = false;
    },
    saveLocation() {
      EventBus.$emit("saveLocationFromRestaurantForm");
    },
    getListLocation(){
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
            .post(`/${this.entity}/save`, data)
            .then((response) => {
              this.id = response.data.data.items.id;
              this.$message.success("Tạo thành công");
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
          this.user.avatar_id = imageUrl;
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
</script>
<style scoped>
.select {
  display: flex;
  position: relative;
}
</style>

<template>
  <a-form-model
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="formData"
    :rules="rules"
    ref="ruleForm"
  >
    <a-form-model-item label="Tên địa điểm" ref="title" prop="title">
      <a-input v-model="formData.title" type="text" :allowClear="true" />
    </a-form-model-item>
    <a-form-model-item label="Tỉnh/Thành phố" ref="province" prop="province">
      <a-select
        show-search
        :value="formData.province_id"
        placeholder="Vui lòng chọn tinh/thành phố"
        style="width: 100%"
        :default-active-first-option="false"
        :show-arrow="true"
        :filter-option="false"
        :not-found-content="null"
        :allowClear="true"
        @focus="getListProvince"
        @change="handleChangeProvince"
      >
        <a-select-option v-for="d in listProvince" :key="d.province_id">
          {{ d.title }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Quận/Huyện" ref="district" prop="district">
      <a-select
        show-search
        :value="formData.district_id"
        placeholder="Vui lòng chọn quận/huyện"
        style="width: 100%"
        :default-active-first-option="false"
        :show-arrow="true"
        :filter-option="false"
        :not-found-content="null"
        :allowClear="true"
        @focus="getListDistrict"
        @change="handleChangeDistrict"
      >
        <a-select-option v-for="d in listDistrict" :key="d.district_id">
          {{ d.title }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Phường/Xã" ref="ward" prop="ward">
      <a-select
        show-search
        :value="formData.ward_id"
        placeholder="Vui lòng chọn phường/xã"
        style="width: 100%"
        :default-active-first-option="false"
        :show-arrow="true"
        :filter-option="false"
        :not-found-content="null"
        :allowClear="true"
        @focus="getListWard"
        @change="handleChangeWard"
      >
        <a-select-option v-for="d in listWard" :key="d.ward_id">
          {{ d.title }}
        </a-select-option>
      </a-select>
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
    let formData = {
      title: "",
      province_id: null,
      district_id: null,
      ward_id: null,
    };
    return {
      formData,
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      data: [],
      loading: false,
      imageUrl: "",
      listProvince: [],
      listDistrict: [],
      listWard: [],
    };
  },
  methods: {
    fetchDataEdit(data) {
      this.formData.title = data.title;
      this.formData.province_id = data.province_id;
      this.formData.district_id = data.district_id;
      this.formData.ward_id = data.ward_id;
    },
    save() {
      var data = {
        title: this.formData.title,
        province_id: this.formData.province_id,
        district_id: this.formData.district_id,
        ward_id: this.formData.ward_id,
        
      };
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          http
            .post("/location/update", data, {
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
    getListProvince() {
      http
        .get(`vie-province/list`)
        .then((response) => {
          this.listProvince = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },

    handleChangeProvince(data) {
      this.formData.province_id = data;
    },
    getListDistrict() {
      http
        .get(`vie-district/list`, {
          params: {
            id: this.formData.province_id,
          },
        })
        .then((response) => {
          this.listDistrict = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    handleChangeDistrict(data) {
      this.formData.district_id = data;
    },
    getListWard() {
      http
        .get(`vie-ward/list`, {
          params: {
            id: this.formData.district_id,
          },
        })
        .then((response) => {
          this.listWard = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    handleChangeWard(data) {
      this.formData.ward_id = data;
    },
  },
};
</script>

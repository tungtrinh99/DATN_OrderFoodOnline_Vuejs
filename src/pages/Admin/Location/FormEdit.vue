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
        label-in-value
        :value="formData.province"
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
        <a-select-option v-for="d in listProvince" :key="d.value">
          {{ d.text }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Quận/Huyện" ref="district" prop="district">
      <a-select
        show-search
        label-in-value
        :value="formData.district"
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
        <a-select-option v-for="d in listDistrict" :key="d.value">
          {{ d.text }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Phường/Xã" ref="ward" prop="ward">
      <a-select
        show-search
        label-in-value
        :value="formData.ward"
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
        <a-select-option v-for="d in listWard" :key="d.value">
          {{ d.text }}
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
      province: {},
      district: {},
      ward: {},
    };
    return {
      formData,
      moment,
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
      this.formData.province.key = data.province_id;
      this.formData.province.label = data.province_title;
      this.formData.district.key = data.district_id;
      this.formData.district.label = data.district_title;
      this.formData.ward.key = data.ward_id;
      this.formData.ward.label = data.ward_title;
    },
    save() {
      var data = {
        title: this.formData.title,
        province_id: this.formData.province.key,
        district_id: this.formData.district.key,
        ward_id: this.formData.ward.key,
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
          let data = response.data.data.items.map((d) => ({
            value: d.province_id,
            text: d.title,
          }));
          this.listProvince = this.listProvince.concat(data);
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },

    handleChangeProvince(data) {
      this.formData.province = data;
    },
    getListDistrict() {
      http
        .get(`vie-district/list`, {
          params: {
            id: this.formData.province.key,
          },
        })
        .then((response) => {
          let data = response.data.data.items.map((d) => ({
            value: d.province_id,
            text: d.title,
          }));
          this.listDistrict = this.listDistrict.concat(data);
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    handleChangeDistrict(data) {
      this.formData.district = data
    },
    getListWard() {
      http
        .get(`vie-ward/list`, {
          params: {
            id: this.formData.district.key,
          },
        })
        .then((response) => {
          let data = response.data.data.items.map((d) => ({
            value: d.ward_id,
            text: d.title,
          }));
          this.listWard = this.listWard.concat(data);
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    handleChangeWard(data) {
      this.formData.ward = data
    },
  },
};
</script>

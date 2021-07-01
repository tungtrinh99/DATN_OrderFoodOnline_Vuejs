<template>
  <div style="height: 100%; width: 100%">
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
          :disabled="isDistrictDisabled"
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
          :disabled="isWardDisabled"
        >
          <a-select-option v-for="d in listWard" :key="d.ward_id">
            {{ d.title }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <open-street-map @coordinates="getCoordinates" :waypoints="waypoints"></open-street-map>
  </div>
</template>
<script>
import http from "../../../http-common";
import EventBus from "../../../event-bus";
import RuleConfig from "../../../common/RuleConfig";
import Osm from "../../../components/Maps/OpenStreetMap";
export default {
  components: {
    "open-street-map": Osm,
  },
  created() {
    EventBus.$on("save", this.save);
    EventBus.$on("saveLocationFromRestaurantForm", this.save);

  },
  destroyed() {
    EventBus.$off("save", this.save);
    EventBus.$on("saveLocationFromRestaurantForm", this.save);

  },

  props: {
    entity: String,
  },
  data() {
    var rules = RuleConfig[this.entity];
    let formData = {
      title: "",
      province_id: null,
      district_id: null,
      ward_id: null,
      lat: null,
      lng: null,
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
      provinceTitle: "",
      districtTitle: "",
      wardTitle: "",
      isDistrictDisabled: true,
      isWardDisabled: true,
      waypoints : []
    };
  },
  methods: {
    getCoordinates(value){
      this.formData.lng = value.lng;
      this.formData.lat = value.lat;
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
      this.provinceTitle = this.listProvince.find(
        (item) => item.province_id === data
      ).title;
      if (!this.provinceTitle) return;
      this.isDistrictDisabled = false;
      this.formData.district_id = null;
      this.formData.ward_id = null;
      this.isWardDisabled = true;
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
      this.districtTitle = this.listDistrict.find(
        (item) => item.district_id === data
      ).title;
      if (!this.districtTitle) return;
      this.isWardDisabled = false;
      this.formData.ward_id = null;
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
      let ward = this.listWard.find(item=>item.ward_id == data );
      this.formData.ward_id = data;
      this.wardTitle = ward.title;
      let coordinates = ward.location ;
      this.ParseDMS(coordinates);
      if (!this.wardTitle) return;
    },
    ConvertDMSToDD(degrees, minutes, seconds, direction) {
      var dd = parseFloat(degrees) + minutes / 60 + seconds / (60 * 60);
      if (direction == "S" || direction == "W") {
        dd = dd * -1;
      } 
      return dd;
    },
    ParseDMS(input) {
      let parts = input.split(' ');
      let lat = this.ConvertDMSToDD(parts[0], parts[1], parts[2].replace('N,',''), 'N');
      let lng = this.ConvertDMSToDD(parts[3], parts[4], parts[5].replace('E',''), 'E');
      this.formData.lat = lat;
      this.formData.lng = lng;
    },
    save() {
      const data = {
        title: this.formData.title,
        full_address:
          this.formData.title +
          " , " +
          this.wardTitle +
          " , " +
          this.districtTitle +
          " , " +
          this.provinceTitle,
        province_id: this.formData.province_id,
        district_id: this.formData.district_id,
        ward_id: this.formData.ward_id,
        longitude: this.formData.lng,
        latitude: this.formData.lat,
      };
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          http
            .post(`/${this.entity}/save`, data)
            .then((response) => {
              this.id = response.data.id;
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
  },
  mounted() {},
};
</script>

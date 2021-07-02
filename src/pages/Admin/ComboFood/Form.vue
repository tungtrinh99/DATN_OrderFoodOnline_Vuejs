<template>
  <div>
 <a-form-model
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="combo"
    :rules="rules"
    ref="ruleForm"
  >
    <a-form-model-item label="Ảnh combo" prop="avatar_id">
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
          v-if="combo.avatarId"
          :src="require('../../../../public/images/' + combo.avatarId)"
          alt="file"
          :style="{ width: '120px', height: '120px' }"
        />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">Tải ảnh combo</div>
        </div>
      </a-upload>
    </a-form-model-item>
    <a-form-model-item label="Tên combo" ref="comboCode" prop="combocode">
      <a-input
        v-model="combo.title"
        type="text"
        :allowClear="true"
      />
    </a-form-model-item>
    
     
    <a-form-model-item label="Nhà hàng" >
      <div class="select">
        <a-select
          show-search
          :value="combo.restaurantId"
          placeholder="Vui lòng chọn nhà hàng"
          style="width: 100%; border-left: none"
          :default-active-first-option="false"
          :show-arrow="true"
          :filter-option="false"
          :not-found-content="null"
          :allowClear="true"
          @change="handleChange"
          @focus="getRestaurant"

        >
          <a-select-option v-for="d in restaurant" :key="d.id">
            {{ d.title }}
          </a-select-option>
        </a-select>
       
      </div>
    </a-form-model-item>
    <a-form-model-item label="Giảm giá">
      <a-input
        v-model="combo.discount"
        type="number"
        :allowClear="true"
        suffix="%"
      />
    </a-form-model-item>
    <a-form-model-item label="Món ăn">
      <div v-for="(item,index) in food">
        <a-select
            show-search
            :allowClear="true"
            :autoClearSearchValue="true"
            :value="item.id"
            placeholder="Chọn món ăn"
            style="width: 93% ; border-left: none"
            :filter-option="false"
            @focus="getFood(index)"
            @change="onChangeFood"
        >
          <a-select-option v-for="food in restaurantFood" :key="food.restaurant_food_id">
            {{ food.title }}
          </a-select-option>
        </a-select>
        <a-icon style="color :red;margin-left : 4px" type="delete" @click="removeFood(index)"/>

      </div>
      <a-button @click="addFood" :disabled="!combo.restaurantId">
        <a-icon type="plus"/>
        Thêm món ăn
      </a-button>
    </a-form-model-item>
    <a-form-model-item label="Ghi chú" prop="content">
      <a-textarea v-model="combo.content" :rows="4"/>
    </a-form-model-item>
  </a-form-model>
  
  </div>
 
</template>
<script>
import locale from "ant-design-vue/es/date-picker/locale/vi_VN";
import http from "../../../http-common";
import EventBus from "../../../event-bus";
import RuleConfig from "../../../common/RuleConfig";
 
export default {
  created() {
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

  },
  data() {                                                                                                                                                                                                                      
    var rules = RuleConfig[this.entity];
    let combo = {
     title : '',
     restaurantId : null , 
     avatarId : '',
     discount : null,
     content : ''
    };
    return { 
      combo,
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      loading: false,
      imageUrl: "",
      restaurant:[],
      locale,
      restaurantFood : [],
      food : [],
      foodIndex : null,
    };
  },
  computed:{
    comboCost(){
      return this.food.reduce(function(accumulator, currentValue){return accumulator + currentValue.cost},0);
    }
  },
  methods: {
    removeFood(value){
      this.food.splice(value , 1)
    },
    addFood(){
      this.food.push({id : void 0,cost : void 0})
    },
    onChangeFood(value){
      this.food[this.foodIndex].id = value;
      this.food[this.foodIndex].cost = this.restaurantFood.find(food => food.restaurant_food_id == value).cost;
    },
    getFood(value){
      this.foodIndex = value;
      http
      .post('/restaurant-food/list',{id : this.combo.restaurantId})
      .then((res)=>{
        this.restaurantFood = res.data.data.items;
      })
      .catch(err=>{
        console.log(err);
      })
    },
    getRestaurant(){
      http
        .post("/restaurant/list")
        .then((response) => {
          this.restaurant = response.data.data.items;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    saveComboRestaurant(value){
      let data = {
        id : value,
        foods : this.food
      }
      http
      .post('/combo-food/save',data)
      .then((res)=>{})
      .catch(err=>console.log(err))
    },
    save() {
      var data = {
        title : this.combo.title,
        restaurant_id : this.combo.restaurantId,
        avatar_id : this.combo.avatarId ,
        discount : this.combo.discount,
        content : this.combo.content,
        cost : this.comboCost
      };

      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          http
            .post(`/${this.entity}/save`, data)
            .then((response) => {
              this.id = response.data.data.items.id;
              let comboId = response.data.data.items.insertId;
              this.$message.success("Tạo thành công");
              this.saveComboRestaurant(comboId);
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
   handleChange(value){
       this.combo.restaurantId = value;
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
          this.combo.avatar_id = imageUrl;
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
          this.combo.avatarId = response.data.data;
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

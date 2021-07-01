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
          label-in-value
          show-search
          :value="combo.restaurant"
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
      />
    </a-form-model-item>
    <a-form-model-item label="Món ăn">
      <div v-for="(item,index) in food">
        <a-select
            label-in-value
            show-search
            :allowClear="true"
            :autoClearSearchValue="true"
            :value="item"
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
import http from "../../../http-common";
import EventBus from "../../../event-bus";
import RuleConfig from "../../../common/RuleConfig";
 
export default {
  created() {
    EventBus.$on("saveEdit", this.save);
    EventBus.$on("data", this.fetchDataEdit);
  },
  destroyed() {
    EventBus.$off("saveEdit", this.save);
    EventBus.$off("data", this.fetchDataEdit);

  },
  props: {                                                                                                                                                                                                                      
    entity: String,
    id: Number,
  },
  components:{

  },
  data() {                                                                                                                                                                                                                      
    var rules = RuleConfig[this.entity.replace('-','_')];
    let combo = {
     title : '',
     restaurantId : null , 
     avatarId : '',
     discount : null,
     content : '',
     restaurant : void 0
    };
    return { 
      combo,
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      loading: false,
      imageUrl: "",
      restaurant:[],
      food : [],
      foodIndex : null,
      restaurantFood : [],


    };
  },
  methods: {
    fetchDataEdit(data){
        this.combo.restaurant ={ key : data.restaurant_id , label : data.name_of_restaurant_id };
        this.combo.title = data.title;
        this.combo.restaurantId = data.restaurant_id;
        this.combo.avatarId = data.avatar_id;
        this.combo.discount = data.discount;
        this.combo.content = data.content;
        this.getComboFood();
    },
    getComboFood(){
      http
      .get('/combo-food/list',{
        params:{
          id : this.id
        }
      }).then((res)=>{
        this.food = res.data.data.items.map((item)=>{
          let obj ={};
          obj.key = item.food_id;
          obj.label = item.title;
          return obj;
        });
      })
      .catch(err=>console.log(err))
    },
    removeFood(value){
      this.food.splice(value , 1)
    },
    addFood(){
      this.food.push({id : void 0})
    },
    onChangeFood(value){
      console.log(value);
      this.food[this.foodIndex] = value;
      this.food[this.foodIndex].food_id = value.key;
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
    deleteComboFood(){
      return http.get('/combo-food/delete',{params : { id : this.id}})
    },
    saveComboRestaurant(){
      let data = {
        foods : this.food.map(item => {return {id : item.key}}),
        id : this.id
      }
      return http.post('/combo-food/save',data)
    },
    save() {
      var data = {
        title : this.combo.title,
        restaurant_id : this.combo.restaurantId,
        avatar_id : this.combo.avatarId ,
        discount : this.combo.discount,
        content : this.combo.content
      };

      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          http
            .post(`/${this.entity}/update`, data,{
              params: {
                id: this.id,
              },
            })
            .then((response) => {
              this.$message.success("Cập nhật thành công");
              Promise.all([this.deleteComboFood(),this.saveComboRestaurant()])
              .then(([save,del])=>{})
              .catch((error)=>{})
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
       this.combo.restaurantId = value.key;
       this.combo.restaurant = value;
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
  mounted() {
    
  },
};
</script>
</script>
<style scoped>
.select {
  display: flex;
  position: relative;
}
</style>

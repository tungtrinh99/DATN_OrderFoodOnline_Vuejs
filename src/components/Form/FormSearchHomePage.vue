<template>
  <div class="home-search">
    <div>
      <h1 class="title">Đặt Đồ ăn, giao hàng từ 20'...</h1>
      <div class="local">có 25902 địa điểm ở Hà Nội từ 00:00 - 23:59</div>
    </div>
    <div class="form-search">
      <a-input-search
        size="large"
        placeholder="Tìm địa điểm, món ăn, địa chỉ..."
        enter-button
        @search="onSearch"
      />
    </div>
    <div class="category-list-filter">
      <a href="/ha-noi/danh-sach-dia-diem-giao-tan-noi"
        ><span class="category-item">All</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-food-giao-tan-noi"
        ><span class="category-item">Đồ ăn</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-drink-giao-tan-noi"
        ><span class="category-item">Đồ uống</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-vegetarian-giao-tan-noi"
        ><span class="category-item">Đồ chay</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-cake-pastry-giao-tan-noi"
        ><span class="category-item">Bánh kem</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-desserts-giao-tan-noi"
        ><span class="category-item">Tráng miệng</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-home-made-giao-tan-noi"
        ><span class="category-item">Homemade</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-streetfood-giao-tan-noi"
        ><span class="category-item">Vỉa hè</span></a
      ><a
        href="/ha-noi/danh-sach-dia-diem-phuc-vu-pizza-pasta-burger-giao-tan-noi"
        ><span class="category-item">Pizza/Burger</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-chicken-giao-tan-noi"
        ><span class="category-item">Món gà</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-hotpot-giao-tan-noi"
        ><span class="category-item">Món lẩu</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-sushi-giao-tan-noi"
        ><span class="category-item">Sushi</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-soup-based-giao-tan-noi"
        ><span class="category-item">Mì phở</span></a
      ><a href="/ha-noi/danh-sach-dia-diem-phuc-vu-rice-giao-tan-noi"
        ><span class="category-item">Cơm hộp</span></a
      >
    </div>
    <div>
      <div class="form-bottom">
        Sử dụng App Now để có nhiều giảm giá <br />và trải nghiệm tốt hơn
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onSearch(value) {
      console.log(value);
    },
  },
};
</script>
<style scoped>
.home-search {
  color: #fff;
  width: 470px;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  margin-top: -30px;
  text-align: left;
}
.home-search .title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #fff;
}
.home-search .local {
  font-size: 15px;
  text-transform: capitalize;
}
.home-search .form-search {
  padding: 27px 0 40px;
  position: relative;
}
.category-list-filter > a {
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 15px;
}
.category-list-filter .category-item {
  font-size: 16px;
  color: #fff;
  white-space: nowrap;
  cursor: pointer;
  padding: 7px 21px;
  border-radius: 6px;
  border: 1px solid;
  display: inline-block;
  transition: all 0.3s ease;
}
.category-list-filter .category-item:hover {
  text-decoration: none;
  color: #252525;
  background-color: #fff;
  border-color: #fff;
}
.form-bottom{
  font-size: 18px !important;
  margin : 16px 0 8px 0;
}
</style>
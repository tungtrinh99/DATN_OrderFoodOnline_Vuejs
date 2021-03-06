const food = {
  avatar_id: [{
    required: true,
    message: "Bạn chưa chọn ảnh",
    trigger: "blur"
  }],

  title: [{
    required: true,
    message: "Bạn chưa nhập tên đồ ăn",
    trigger: "blur"
  }],
  type: [{
    required: true,
    message: "Bạn chưa nhập kiểu đồ ăn",
    trigger: "blur"
  }],


};
const user = {



  username: [{
    required: true,
    message: "Bạn chưa nhập tên đăng nhập",
    trigger: "blur"
  }],
  password: [{
    required: true,
    message: "Bạn chưa nhập mật khẩu",
    trigger: "blur"
  }],
  fullname: [{
    required: true,
    message: "Bạn chưa nhập tên ",
    trigger: "blur"
  }],
  address: [{
    required: true,
    message: "Bạn chưa nhập địa chỉ",
    trigger: "blur"
  }],
  active: [{
    required: true,
    message: "Bạn chưa nhập trạng thái hoạt động",
    trigger: "blur"
  }],


};
const restaurant = {


  avatar: [{
    required: true,
    message: "Bạn chưa chọn ảnh đại diện",
    trigger: "blur"
  }],
  title: [{
    required: true,
    message: "Bạn chưa nhập tên quán",
    trigger: "blur"
  }],
  opentime: [{
    required: true,
    message: "Bạn chưa nhập giờ mở cửa",
    trigger: "blur"
  }],
  closetime: [{
    required: true,
    message: "Bạn chưa nhập giờ đóng cửa ",
    trigger: "blur"
  }],
  location_id: [{
    required: true,
    message: "Bạn chưa nhập địa chỉ ",
    trigger: "blur"
  }],
  user: [{
    required: true,
    message: "Bạn chưa chọn chủ quán",
    trigger: "blur"
  }],
  // phone_res: [{
  //   required: true,
  //   message: "Bạn chưa nhập số điện thoại",
  //   trigger: "blur"
  // }],
  // type: [{
  //   required: true,
  //   message: "Bạn chưa chọn kiểu nhà hàng",
  //   trigger: "blur"
  // }],


};
const location = {
  title: [{
    required: true,
    message: "Bạn chưa nhập tên địa điểm",
    trigger: "blur"
  }],
  // province: [{
  //   required: true,
  //   message: "Bạn chưa nhập tỉnh/thành phố ",
  //   trigger: "blur"
  // }],
  // district: [{
  //   required: true,
  //   message: "Bạn chưa nhập địa quận/huyện",
  //   trigger: "blur"
  // }],
  // ward: [{
  //   required: true,
  //   message: "Bạn chưa nhập xã/phường",
  //   trigger: "blur"
  // }],
}
const discount = {
  code: [{
    required: true,
    message: "Bạn chưa nhập mã giảm giá",
    trigger: "blur"
  }],
  discount: [{
    required: true,
    message: "Bạn chưa nhập tiền giảm giá ",
    trigger: "blur"
  }],
  min_total_order: [{
    required: true,
    message: "Bạn chưa nhập tổng đơn hàng",
    trigger: "blur"
  }],
  max_distance: [{
    required: true,
    message: "Bạn chưa nhập quãng đường tối đa",
    trigger: "blur"
  }],
}
const restaurant_discount = {
  code: [{
    required: true,
    message: "Bạn chưa nhập chọn giảm giá",
    trigger: "blur"
  }],
  
};
const restaurant_combo = {
  restaurant_id: [{
    required: true,
    message: "Bạn chưa nhập chọn nhà hàng",
    trigger: "blur"
  }],
  title : [{
    required : true , 
    message : "Bạn chưa nhập tên combo",
    trigger: "blur"
  }],
  discount : [{
    required : true , 
    message : "Bạn chưa nhập giảm giá",
    trigger: "blur"
  }]
  
}
const lading_bill = {
  code: [{
    required: true,
    message: "Bạn chưa nhập mã vận đơn",
    trigger: "blur"
  }],
  driver : [{
    required : true , 
    message : "Bạn chưa chọn tài xế",
    trigger: "blur"
  }],
  status : [{
    required : true , 
    message : "Bạn chưa chọn trạng thái vận đơn",
    trigger: "blur"
  }]
}
export default {
  food,
  user,
  restaurant,
  location,
  restaurant_discount,
  discount,
  restaurant_combo,
  lading_bill
}

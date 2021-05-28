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
export default {
  food,
  user,
  restaurant,
  location
}

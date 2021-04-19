const food = {
  avatar_id: [
    {
      required: true,
      message: "Bạn chưa chọn ảnh",
      trigger: "blur"
    }
  ],

  title: [
    {
      required: true,
      message: "Bạn chưa nhập tên đồ ăn",
      trigger: "blur"
    }
  ],
  type: [
    {
      required: true,
      message: "Bạn chưa nhập kiểu đồ ăn",
      trigger: "blur"
    }
  ],

  
};
const user = {
  

  usercode: [
    {
      required: true,
      message: "Bạn chưa nhập mã khách hàng",
      trigger: "blur"
    }
  ],
  username: [
    {
      required: true,
      message: "Bạn chưa nhập tên đăng nhập",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "Bạn chưa nhập mật khẩu",
      trigger: "blur"
    }
  ],
  fullname: [
    {
      required: true,
      message: "Bạn chưa nhập tên ",
      trigger: "blur"
    }
  ],
  address: [
    {
      required: true,
      message: "Bạn chưa nhập địa chỉ",
      trigger: "blur"
    }
  ],
  active: [
    {
      required: true,
      message: "Bạn chưa nhập trạng thái hoạt động",
      trigger: "blur"
    }
  ],

  
};
export default {
    food,
    user
}


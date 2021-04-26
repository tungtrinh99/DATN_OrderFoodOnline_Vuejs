const food = [{
    title: "Ảnh",
    dataIndex: "avatar_id",
    key: "avatar",
    width: 100,
    dataType: "file"
  },
  {
    title: "Mã sản phẩm",
    dataIndex: "id",
    key: "id",
    width: 100
  },

  {
    title: "Loại đồ ăn",
    dataIndex: "type",
    key: "type",
    width: 100
  },
  {
    title: "Tên",
    dataIndex: "title",
    key: "title",
    width: 500
  }
];
const customer = [{
    title: "Ảnh",
    dataIndex: "avatar_id",
    key: "avatar",
    width: 60,
    dataType: "file"
  },
  {
    title: "Mã khách hàng",
    dataIndex: "user_code",
    key: "id",
    width: 100
  },
  {
    title: "Tên khách hàng",
    dataIndex: "fullname",
    key: "fullname",
    width: 100
  },
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
    width: 100
  },
  {
    title: "Mật khẩu",
    dataIndex: "password",
    key: "password",
    width: 100
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 100
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    dataType: "gender",
    key: "gender",
    width: 100
  }, {
    title: "Ngày sinh",
    dataIndex: "birth_date",
    key: "birth_date",
    dataType: "date",
    width: 100
  }, {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: 100
  },

];
const merchant = [{
  title: "Ảnh",
  dataIndex: "avatar_id",
  key: "avatar",
  width: 60,
  dataType: "file"
},
{
  title: "Mã khách hàng",
  dataIndex: "user_code",
  key: "id",
  width: 100
},
{
  title: "Tên khách hàng",
  dataIndex: "fullname",
  key: "fullname",
  width: 100
},
{
  title: "Tên đăng nhập",
  dataIndex: "username",
  key: "username",
  width: 100
},
{
  title: "Mật khẩu",
  dataIndex: "password",
  key: "password",
  width: 100
},
{
  title: "Email",
  dataIndex: "email",
  key: "email",
  width: 100
},
{
  title: "Giới tính",
  dataIndex: "gender",
  dataType: "gender",
  key: "gender",
  width: 100
}, {
  title: "Ngày sinh",
  dataIndex: "birth_date",
  key: "birth_date",
  dataType: "date",
  width: 100
}, {
  title: "Địa chỉ",
  dataIndex: "address",
  key: "address",
  width: 100
},

];
const restaurant = [{
    title: "Ảnh",
    dataIndex: "avatar_id",
    key: "avatar",
    width: 60,
    dataType: "file"
  },
  {
    title: "Mã quán",
    dataIndex: "id",
    key: "id",
    width: 70
  },
  {
    title: "Tên quán",
    dataIndex: "title",
    key: "name",
    width: 200
  },
  {
    title: "Kiểu quán ăn",
    dataIndex: "type_id",
    dataType : "type",
    key: "type",
    width: 100
  },
  {
    title: "Giờ mở cửa",
    dataIndex: "opentime",
    key: "opentime",
    width: 100
  },
  {
    title: "Giờ đóng cửa",
    dataIndex: "closetime",
    key: "closetime",
    width: 100
  },
  {
    title: "Chủ quán",
    dataIndex: "name_of_user_id",
    key: "name_user",
    width: 100
  }, {
    title: "Số điện thoại",
    dataIndex: "phone_number",
    key: "phone",
    width: 100
  }, {
    title: "Địa chỉ",
    dataIndex: "full_address",
    key: "phone_res",
    width: 200
  }

];
const location = [
  {
    title: "Mã",
    dataIndex: "id",
    key: "id",
    width: 100
  },
  {
    title: "Tên",
    dataIndex: "title",
    key: "title",
    width: 200
  },
  {
    title: "Địa chỉ",
    dataIndex: "full_address",
    key: "full_address",
    width: 200
  },
  {
    title: "Tỉnh/Thành phố",
    dataIndex: "province_title",
    key: "province_title",
    width: 200
  },
  {
    title: "Quận/huyện",
    dataIndex: "district_title",
    key: "district_title",
    width: 200
  },
  {
    title: "Phường/xã",
    dataIndex: "ward_title",
    key: "ward_title",
    width: 200
  }
]
export default {
  food,
  customer,
  merchant,
  restaurant,
  location
};

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
const user = [{
    title: "Ảnh",
    dataIndex: "avatar_id",
    key: "avatar",
    width: 100,
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
    dataType:"gender",
    key: "gender",
    width: 100
  }, {
    title: "Ngày sinh",
    dataIndex: "birth_date",
    key: "birth_date",
    dataType:"date",
    width: 100
  }, {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: 100
  },

];
export default {
  food,
  user
};

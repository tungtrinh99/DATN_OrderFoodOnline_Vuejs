import constant from "../constant";
const food = [{
    title: "Ảnh",
    dataIndex: "avatar_id",
    key: "avatar",
    fixed: "left",
    width: 80,
    dataType: "file"
  },
  {
    title: "Mã sản phẩm",
    dataIndex: "id",
    fixed: "left",

    key: "id",
    width: 120,
  },

  {
    title: "Loại đồ ăn",
    dataIndex: "name_of_type_id",
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
    fixed: "left",

    width: 60,
    dataType: "file"
  },
  {
    title: "Mã khách hàng",
    dataIndex: "user_code",
    key: "id",
    fixed: "left",

    width: 150,
  },
  {
    title: "Tên khách hàng",
    dataIndex: "fullname",
    key: "fullname",
    width: 200
  },
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
    width: 200
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
    dataType: "email",
    ellipsis: true
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone_number",
    key: "phone",
    dataType: 'phone',
    width: 150
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
    width: 120
  }, {
    title: "Địa chỉ",
    dataIndex: "full_address",
    key: "address",
    width: 200,
    ellipsis: true

  },

];
const merchant = [{
    title: "Ảnh",
    dataIndex: "avatar_id",
    key: "avatar",
    fixed: "left",

    width: 60,
    dataType: "file"
  },
  {
    title: "Mã khách hàng",
    dataIndex: "user_code",
    key: "id",
    fixed: "left",

    width: 150,
  },
  {
    title: "Tên khách hàng",
    dataIndex: "fullname",
    key: "fullname",
    width: 200
  },
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
    width: 200
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
    ellipsis: true
  },

  {
    title: "Số điện thoại",
    dataIndex: "phone_number",
    key: "phone",
    dataType: 'phone',
    width: 150
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
    width: 120
  }, {
    title: "Địa chỉ",
    dataIndex: "full_address",
    key: "address",
    width: 200,
    ellipsis: true

  },

];
const restaurant = [{
    title: "Ảnh",
    dataIndex: "avatar_id",
    key: "avatar",
    fixed: "left",

    width: 60,
    dataType: "file"
  },
  {
    title: "Mã quán",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    dataType:"link",
    width: 100,
  },
  {
    title: "Tên quán",
    dataIndex: "title",
    key: "name",
    width: 250,
    fixed:"left",
    ellipsis: true,

  },
  {
    title: "Địa chỉ",
    dataIndex: "full_address",
    key: "phone_res",
    width: 200,
    ellipsis: true,

  },
  {
    title: "Kiểu quán ăn",
    dataIndex: "name_of_restaurant_type_id",
    key: "type",
    width: 100
  },
  {
    title: "Giờ mở cửa",
    dataIndex: "opentime",
    key: "opentime",
    width: 100,
    dataType: "time"
  },
  {
    title: "Giờ đóng cửa",
    dataIndex: "closetime",
    key: "closetime",
    width: 100,
    dataType: "time"
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone_number",
    key: "phone",
    width: 100,
    dataType: "phone"
  }
];
const location = [{
    title: "Mã",
    dataIndex: "id",
    key: "id",
    fixed: "left",

    width: 100,
  },
  {
    title: "Tên",
    dataIndex: "title",
    key: "title",
    fixed: "left",
    ellipsis: true,
    width: 200
  },
  {
    title: "Địa chỉ",
    dataIndex: "full_address",
    key: "full_address",
    width: 300,
    ellipsis: true
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
];
const orders = [{
    title: "Mã",
    dataIndex: "id",
    key: "id",
    width: 80,
    fixed: "left",
    isCodeIndex :true

},
  {
    title: "Mã đơn hàng",
    dataIndex: "order_code",
    key: "order_code",
    width: 150,
    fixed: "left",

  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 200,
    dataType: "list",
    dataSource: constant.orderCustomerStatus,

  },

  {
    title: "Ngày đặt hàng",
    dataIndex: "create_at",
    key: "create_at",
    width: 200,
    dataType: 'date'

  },
  {
    title: "Tên khách hàng",
    dataIndex: "name_of_customer_id",
    key: "name_of_customer_id",
    width: 200,
    dataType: 'text',
    ellipsis: true,

  },

  {
    title: "Điạ chỉ nhận hàng",
    dataIndex: "location_arrival",
    key: "location_arrival",
    width: 200,
    dataType: 'text',
    ellipsis: true,


  },
  {
    title: "Điạ chỉ lấy hàng",
    dataIndex: "location_destination",
    key: "location_destination",
    width: 200,
    dataType: 'text',
    ellipsis: true,


  },
  {
    title: "Nhà hàng",
    dataIndex: "name_of_restaurant_id",
    key: "name_of_restaurant_id",
    width: 200,
    dataType: 'text',
    ellipsis: true,


  },

  {
    title: "Phí vận chuyển",
    dataIndex: "shipping",
    key: "shipping",
    width: 200,
    dataType: 'number'

  },
  {
    title: "Giảm giá",
    dataIndex: "promo",
    key: "promo",
    width: 200,
    dataType: 'number'

  },
  {
    title: "Tổng hóa đơn",
    dataIndex: "grand_total",
    key: "grand_total",
    width: 200,
    dataType: 'number'

  },
  {
    title: "Khoảng cách",
    dataIndex: "distant",
    key: "distant",
    width: 200,
    dataType: 'number'

  }
];
const food_restaurant = [{
  title: "Ảnh",
  dataIndex: "avatar_id",
  key: "avatar",
  fixed: "left",
  width: 80,
  dataType: "file"
},
{
  title: "Loại đồ ăn",
  dataIndex: "name_of_food_type",
  key: "type",
  width: 100
},
{
  title: "Tên",
  dataIndex: "title",
  key: "title",
  width: 500
},{
  title: "Giá",
  dataIndex: "cost",
  key: "cost",
  width: 500
},{
  title: "Giảm giá",
  dataIndex: "discount",
  key: "discount",
  width: 500
}
];
const report = [
{
  title: "Nhà hàng",
  dataIndex: "title",
  key: "title",
  ellipsis: true,
  

},{
  title: "Doanh thu",
  dataIndex: "revenue",
  key: "revenue",
  scopedSlots: { customRender: 'money' },

},{
  title: "Số đơn",
  dataIndex: "order_quantity",
  key: "order_quantity",
}
,{
  title: "Chi phí vận chuyển",
  dataIndex: "ship_fee",
  key: "ship_fee",
  scopedSlots: { customRender: 'money' },
}
];
export default {
  food,
  customer,
  merchant,
  restaurant,
  location,
  orders,
  food_restaurant,
  report
}

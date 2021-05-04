const title = {
    food : 'Đồ ăn',
    restaurant : 'Quán ăn',
    user : 'Người dùng',
    location : 'Địa chỉ',
    order : 'Đơn hàng'
}
const gender = {
    NAM : 1,
    NU : 2
}
const restaurantType = {
    QUANAN : 1,
    QUANNUOC : 2 , 
    ANVATVIAHE : 3 ,
    QUANONLINE : 4
}
const orderStatus = {
    KHOI_TAO : 1,
    CHO_XAC_NHAN : 2 , 
    DANG_VAN_CHUYEN : 3 ,
    DA_HOAN_THANH : 4 , 
    HUY : 5
}
export default  {
    genderText : [
        {
            value : gender.NAM,
            text : "Nam",
    
        },
        {
            value : gender.NU,
            text : "Nữ",
    
        }
    ],
    typeRestaurant : [
        {
            value : restaurantType.QUANAN,
            text : 'Quán ăn',
        },
        {
            value : restaurantType.QUANNUOC,
            text : 'Quán nước',
        },{
            value : restaurantType.ANVATVIAHE,
            text : 'Ăn vặt vỉa hè',
        },{
            value : restaurantType.QUANONLINE,
            text : 'Quán onlines',
        }

    ],
    title,
    status : [
        {
            value : orderStatus.KHOI_TAO,
            text:'Khởi tạo'
        },
        {
            value : orderStatus.CHO_XAC_NHAN,
            text:'Chờ xác nhận'
        },{
            value : orderStatus.DANG_VAN_CHUYEN,
            text:'Đang vận chuyển'
        },{
            value : orderStatus.DA_HOAN_THANH,
            text:'Đã hoàn thành'
        },{
            value : orderStatus.HUY,
            text:'Hủy'
        }
    ]
}
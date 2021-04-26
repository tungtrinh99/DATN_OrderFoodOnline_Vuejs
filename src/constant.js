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
    title
}
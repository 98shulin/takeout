import axios from 'axios'
// ip地址 
const IP='http://127.0.0.1:5000'
// 店铺上传图片接口
export const SHOP_UPLOAD =IP+'/shop/upload'
// 商品上传接口 
export const GOODS_UPLOAD = IP+'/goods/goods_img_upload'
// 店铺图片渲染 
export const SHOP_UPLOAD_IMG =IP+'/upload/shop/'

axios.defaults.baseURL = IP

// 1. 登录接口
// account:用户名
// password:密码
export const LOGIN = (account, password) => axios.post('/users/checkLogin', { account, password })
//2. 添加用户接口
// userGroup：用户组
export const Add_ACC = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup })
//3. 用户列表
// currentPage：当前页
// pageSize：每页显示条数
export const ACC_LIST = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })
//4. 删除用户
export const DEL_ACC = id => axios.get('/users/del', { params: { id } })
//5. 批量删除
// ids：id集合
export const BATCHDE_ACC = ids => axios.get('/users/batchdel', { params: { ids } })
//6. 编辑信息
export const EDIT_ACC = (id, account, userGroup) => axios.post('/users/edit', { id, account, userGroup })
//7. 验证旧密码
export const OLD = (id, oldPwd) => axios.get('/users/checkoldpwd', { params: { id, oldPwd } })
//8. 修改密码
export const MODIFY_ACC = (id, newPwd) => axios.post('/users/editpwd', { id, newPwd })
//9. 获取账号（个人中心）信息
export const ACCountinfo = id => axios.get('/users/accountinfo', { params: { id } })
// 11. 验证token
export const TOKEN = token => axios.get('/users/checktoken', { params: { token } })
//12. 添加分类
export const ADDCATE_GOODS = (cateName, state) => axios.post('/goods/addcate', { cateName, state })
//13. 获取分类
export const CATELIST_GOODS = (currentPage, pageSize) => axios.get('/goods/catelist', { params: { currentPage, pageSize } })
//14. 删除分类
export const DEL_GOODS = id => axios.get('/goods/delcate', { params: { id } })
//15. 修改分类
export const EDITCCATE_GOODS = (id, cateName, state) => axios.post('/goods/editcate', { id, cateName, state })
//16. 查询所有分类
export const CATEGORIES_GOODS = () => axios.get('/goods/categories')
//18. 增加商品
export const ADD_GOODS = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc })
//19. 商品列表
export const LIST_GOODS = (currentPage, pageSize) => axios.get('/goods/list', { params: { currentPage, pageSize } })
//20. 删除商品
export const DEL_GOODS_LIST = id => axios.get('/goods/del', { params: { id } })
//21. 修改商品
export const EDIT_GOODS = (name, category, price, imgUrl, goodsDesc, id) => axios.post('/goods/edit', { name, category, price, imgUrl, goodsDesc, id })
//22. 获取订单列表
export const LIST_ORDER = (currentPage, pageSize) => axios.get('/order/list', { params: { currentPage, pageSize } })
//23. 查询
export const SEARCH_ORDER = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/search', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })
//24. 获取订单详情
export const DETAIL_ORDER = id => axios.get('/order/detail', { params: { id } })
//25. 修改订单
export const EDIT_ORDER = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post('/order/edit', { id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState })
// 26.店铺详情
export const INFO_SHOP = () => axios.get('/shop/info')

//28.店铺内容修改
export const EDIT_SHOP = (params) => axios.post('/shop/edit', params)
//29. 首页报表
export const ORDER_TOTALDATA = () => axios.get('/order/totaldata')
//30. 订单统计
export const ORDER_ORDERTOTAL = (date) => axios.get('/order/ordertotal',{params:{date}})
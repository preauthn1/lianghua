import request from '@/utils/request'

// 示例接口
export const sysShoppingCartList = (params) => request.get('/sysShoppingCart/list', params);

// 添加购物车
export const addSysShoppingCart = (data) => request.post('/sysShoppingCart/insert', data);
// 修改购物车
export const updateSysShoppingCart = (data) => request.put('/sysShoppingCart/update', data);
// 删除购物车
export const deleteSysShoppingCart = (id) => request.delete('/sysShoppingCart/' + id);

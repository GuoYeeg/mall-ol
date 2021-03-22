import request from './request'

export const getHomeList = () => request.get('/index/index');
export const getHistoryList = () => request.get('/search/index');
export const getHelpList = params => request.get('/search/helper',{params});
export const getGoodList = params => request.get('/goods/list',{params});
export const clearhistory = params => request.post('/search/clearhistory',params);
export const goLogin = params => request.post('/auth/loginByWeb',params);
export const getGoodDetailList = params => request.get('/goods/detail',{params});
export const getRelatedGoodList = params => request.get('/goods/related',{params});
//获取购物车中的数量
export const getGoodsCount = params => request.get('/cart/goodscount',{params});
//加入购物车
export const addToCart = params => request.post('/cart/add',params);









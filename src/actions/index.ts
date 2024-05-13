

export * from './address/set-user-address';
export * from './address/delete-user-address';
export * from './address/get-user-address';

export * from './auth/login';
export * from './auth/logout';
export * from './auth/register';
//export * from './auth/register';

export * from './country/get-counyries';

export * from './order/place-order';

export * from './product/get-product-by-slug';
export * from '../actions/product/get-product-by-slug'
 
//export * from './product/get-stock-by-slug';

export { getPaginatedProductsWithImages } from '../actions/product/product-pagination';
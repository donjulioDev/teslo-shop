

export * from './address/set-user-address';
export * from './address/delete-user-address';
export * from './address/get-user-address';


export * from './auth/login';
export * from './auth/logout';
export * from './auth/register';
//export * from './auth/register';

export * from './country/get-counyries';

export * from './order/place-order';
export * from './order/get-order-by-id';
export * from './order/get-paginated-orders';
export * from './order/get-orders-by-user';

export * from './payments/setTransactionId';
export * from './payments/paypal-check-payments';

export * from './category/get-categories';

export * from './product/get-product-by-slug';
export * from '../actions/product/get-product-by-slug';
export { getPaginatedProductsWithImages } from '../actions/product/product-pagination';
export * from './product/create-update-product';
export * from './product/delete-product-image';

export * from './user/get-paginated-users';
export * from './user/change-user-role';


//export * from './product/get-stock-by-slug';
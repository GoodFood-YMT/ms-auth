import { Permissions } from 'App/Enums/Permissions'

type RoutePermission = {
  route: string
  method: string
  permission: string
}

const routesPermissions: RoutePermission[] = [
  {
    route: '/restaurants',
    method: 'POST',
    permission: Permissions.RESTAURANTS_POST,
  },
  {
    route: '/restaurants/*',
    method: 'PUT',
    permission: Permissions.RESTAURANTS_PUT,
  },
  {
    route: '/catalog/categories',
    method: 'POST',
    permission: Permissions.CATALOG_CATEGORIES_POST,
  },
  {
    route: '/catalog/categories/*',
    method: 'PUT',
    permission: Permissions.CATALOG_CATEGORIES_PUT,
  },
  {
    route: '/catalog/*/ingredients',
    method: 'GET',
    permission: Permissions.CATALOG_INGREDIENTS_GET,
  },
  {
    route: '/catalog/*/ingredients',
    method: 'POST',
    permission: Permissions.CATALOG_INGREDIENTS_POST,
  },
  {
    route: '/catalog/*/ingredients/*',
    method: 'GET',
    permission: Permissions.CATALOG_INGREDIENTS_GET,
  },
  {
    route: '/catalog/*/ingredients/*',
    method: 'PUT',
    permission: Permissions.CATALOG_INGREDIENTS_PUT,
  },
  {
    route: '/catalog/*/products',
    method: 'POST',
    permission: Permissions.CATALOG_PRODUCTS_POST,
  },
  {
    route: '/catalog/*/products/*',
    method: 'PUT',
    permission: Permissions.CATALOG_PRODUCTS_PUT,
  },
  {
    route: '/catalog/products/*/ingredients',
    method: 'GET',
    permission: Permissions.CATALOG_PRODUCTS_INGREDIENTS_GET,
  },
  {
    route: '/catalog/products/*/ingredients/*',
    method: 'GET',
    permission: Permissions.CATALOG_PRODUCTS_INGREDIENTS_GET,
  },
  {
    route: '/catalog/products/*/ingredients/*',
    method: 'POST',
    permission: Permissions.CATALOG_PRODUCTS_INGREDIENTS_POST,
  },
  {
    route: '/catalog/products/*/ingredients/*',
    method: 'PUT',
    permission: Permissions.CATALOG_PRODUCTS_INGREDIENTS_PUT,
  },
  {
    route: '/catalog/products/*/ingredients/*',
    method: 'DELETE',
    permission: Permissions.CATALOG_PRODUCTS_INGREDIENTS_DELETE,
  },
  {
    route: '/basket',
    method: 'GET',
    permission: Permissions.BASKET_GET,
  },
  {
    route: '/basket',
    method: 'POST',
    permission: Permissions.BASKET_POST,
  },
  {
    route: '/basket',
    method: 'DELETE',
    permission: Permissions.BASKET_DELETE,
  },
  {
    route: '/basket/clear',
    method: 'DELETE',
    permission: Permissions.BASKET_CLEAR,
  },
  {
    route: '/delivery/addresses',
    method: 'GET',
    permission: Permissions.ADDRESSES_ALL,
  },
  {
    route: '/delivery/addresses',
    method: 'POST',
    permission: Permissions.ADDRESSES_ALL,
  },
  {
    route: '/delivery/addresses/*',
    method: 'GET',
    permission: Permissions.ADDRESSES_ALL,
  },
  {
    route: '/delivery/addresses/*',
    method: 'PATCH',
    permission: Permissions.ADDRESSES_ALL,
  },
  {
    route: '/delivery/addresses/*',
    method: 'DELETE',
    permission: Permissions.ADDRESSES_ALL,
  },
  {
    route: '/delivery/deliveries/*',
    method: 'GET',
    permission: Permissions.DELIVERIES_GET,
  },
  {
    route: '/delivery/deliveries',
    method: 'GET',
    permission: Permissions.DELIVERIES_ALL,
  },
  {
    route: '/delivery/deliveries/*/take',
    method: 'POST',
    permission: Permissions.DELIVERIES_TAKE,
  },
  {
    route: '/delivery/deliveries/*/complete',
    method: 'POST',
    permission: Permissions.DELIVERIES_COMPLETE,
  },
  {
    route: '/ordering/orders',
    method: 'GET',
    permission: Permissions.ORDERS_GET,
  },
  {
    route: '/ordering/orders',
    method: 'POST',
    permission: Permissions.ORDERS_POST,
  },
  {
    route: '/ordering/orders/*',
    method: 'GET',
    permission: Permissions.ORDERS_GET,
  },
  {
    route: '/providers',
    method: 'GET',
    permission: Permissions.PROVIDERS_ALL,
  },
  {
    route: '/providers',
    method: 'POST',
    permission: Permissions.PROVIDERS_ALL,
  },
  {
    route: '/providers/*',
    method: 'GET',
    permission: Permissions.PROVIDERS_ALL,
  },
  {
    route: '/providers/*',
    method: 'PATCH',
    permission: Permissions.PROVIDERS_ALL,
  },
  {
    route: '/providers/*/ingredients',
    method: 'GET',
    permission: Permissions.PROVIDERS_ALL,
  },
  {
    route: '/providers/*/ingredients',
    method: 'POST',
    permission: Permissions.PROVIDERS_ALL,
  },
  {
    route: '/providers/*/ingredients',
    method: 'DELETE',
    permission: Permissions.PROVIDERS_ALL,
  },
]

export const getRoutePermission = (route: string, method: string): string | undefined => {
  console.log(route, method)

  const routePermission = routesPermissions.find(
    (routePermission) =>
      route
        .toLowerCase()
        .match(routePermission.route.replace('/', '\\/').replace('*', '(.*)').toLowerCase()) &&
      routePermission.method.toLowerCase() === method.toLowerCase()
  )

  return routePermission?.permission
}

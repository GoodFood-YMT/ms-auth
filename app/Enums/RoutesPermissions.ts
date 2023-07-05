import { Permissions } from 'App/Enums/Permissions'

type RoutePermission = {
  route: string
  method: string
  permission: string
}

const routesPermissions: RoutePermission[] = [
  {
    route: '/mailing',
    method: 'GET',
    permission: Permissions.PRODUCT_CATEGORY_CREATE,
  },
  {
    route: '/mailing',
    method: 'POST',
    permission: Permissions.PRODUCT_CATEGORY_CREATE,
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

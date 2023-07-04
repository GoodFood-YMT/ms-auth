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
]

export const getRoutePermission = (route: string, method: string): string | undefined => {
  console.log(route, method)

  const routePermission = routesPermissions.find(
    (routePermission) =>
      routePermission.route.toLowerCase() === route.toLowerCase() &&
      routePermission.method.toLowerCase() === method.toLowerCase()
  )

  return routePermission?.permission
}

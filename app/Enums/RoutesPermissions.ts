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

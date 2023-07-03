import { Permissions } from 'App/Enums/Permissions'

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type RoutePermission = {
  route: string
  method: Method
  permission: string
}

const routesPermissions: RoutePermission[] = [
  {
    route: '/mailing',
    method: 'POST',
    permission: Permissions.PRODUCT_CATEGORY_CREATE,
  },
]

export const getRoutePermission = (route: string, method: Method): string | undefined => {
  const routePermission = routesPermissions.find(
    (routePermission) => routePermission.route === route && routePermission.method === method
  )

  return routePermission?.permission
}

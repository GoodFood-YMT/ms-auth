import { Permissions } from 'App/Enums/Permissions'

export const RoutesPermissions = {
  '/mailing': [Permissions.PRODUCT_CATEGORY_CREATE],
} as const

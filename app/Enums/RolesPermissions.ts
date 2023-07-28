import { Roles } from 'App/Enums/Roles'
import { Permissions } from 'App/Enums/Permissions'

export const RolesPermissions: { [key: string]: string[] } = {
  [Roles.ADMIN]: [...Object.values(Permissions)],
  [Roles.MANAGER]: [
    Permissions.USERS_GET,
    Permissions.CATALOG_CATEGORIES_POST,
    Permissions.CATALOG_CATEGORIES_PUT,
    Permissions.CATALOG_INGREDIENTS_GET,
    Permissions.CATALOG_INGREDIENTS_POST,
    Permissions.CATALOG_INGREDIENTS_PUT,
    Permissions.CATALOG_PRODUCTS_POST,
    Permissions.CATALOG_PRODUCTS_PUT,
    Permissions.CATALOG_PRODUCTS_INGREDIENTS_GET,
    Permissions.CATALOG_PRODUCTS_INGREDIENTS_POST,
    Permissions.CATALOG_PRODUCTS_INGREDIENTS_PUT,
    Permissions.CATALOG_PRODUCTS_INGREDIENTS_DELETE,
    Permissions.ADDRESSES_ALL,
    Permissions.DELIVERIES_GET,
    Permissions.BASKET_GET,
    Permissions.BASKET_POST,
    Permissions.BASKET_DELETE,
  ],
  [Roles.DELIVERER]: [
    Permissions.ADDRESSES_ALL,
    Permissions.DELIVERIES_GET,
    Permissions.BASKET_GET,
    Permissions.BASKET_POST,
    Permissions.BASKET_DELETE,
  ],
  [Roles.CUSTOMER]: [
    Permissions.ADDRESSES_ALL,
    Permissions.DELIVERIES_GET,
    Permissions.BASKET_GET,
    Permissions.BASKET_POST,
    Permissions.BASKET_DELETE,
  ],
}

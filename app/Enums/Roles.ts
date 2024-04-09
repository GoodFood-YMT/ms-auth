export const Roles = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  DELIVERER: 'deliverer',
  CUSTOMER: 'customer',
} as const

export type Roles = (typeof Roles)[keyof typeof Roles]

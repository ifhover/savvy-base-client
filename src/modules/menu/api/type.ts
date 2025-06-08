export type Menu = {
  id: string
  name: string
  icon: string
  path: string
  pid: string
  required_permission_id: string
  is_displayed: boolean
  children: Menu[]
}

export type MenuForm = Omit<Menu, 'children'>

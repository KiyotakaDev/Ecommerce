import { HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const navLinks = [
  { name: "Dashboard", to: "/admin", icon: HomeIcon },
  { name: "Admins", to: "/admin/admins", icon: UserGroupIcon }
]

export { navLinks }
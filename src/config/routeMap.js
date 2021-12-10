import Loadable from 'react-loadable'
import Loading from '@/components/Loading'
const Dashboard = Loadable({
  loader: () => import('@/views/dashboard'),
  loading: Loading
})
const Bug = Loadable({loader: () => import(/*webpackChunkName:'Bug'*/'@/views/bug'),loading: Loading});

export default [
	{path: '/dashboard', component: Dashboard, roles:["admin","editor","guest"]},
	{ path: "/bug", component: Bug, roles: ["admin"] },
]

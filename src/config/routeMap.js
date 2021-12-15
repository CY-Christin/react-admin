import Loadable from 'react-loadable'
import Loading from '@/components/Loading'
const Dashboard = Loadable({
  loader: () => import('@/views/dashboard'),
  loading: Loading
})
const Bug = Loadable({loader: () => import(/*webpackChunkName:'Bug'*/'@/views/bug'),loading: Loading});
const Explanation = Loadable({loader: () => import(/*webpackChunkName:'Explanation'*/'@/views/permission'),loading: Loading});
const AdminPage = Loadable({loader: () => import(/*webpackChunkName:'AdminPage'*/'@/views/permission/adminPage'),loading: Loading});
const GuestPage = Loadable({loader: () => import(/*webpackChunkName:'GuestPage'*/'@/views/permission/guestPage'),loading: Loading});
const EditorPage = Loadable({loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/permission/editorPage'),loading: Loading});
const RichTextEditor = Loadable({loader: () => import(/*webpackChunkName:'RichTextEditor'*/'@/views/components-demo/richTextEditor'),loading: Loading});
const Markdown = Loadable({loader: () => import(/*webpackChunkName:'Markdown'*/'@/views/components-demo/Markdown'),loading: Loading});
const Draggable = Loadable({loader: () => import(/*webpackChunkName:'Draggable'*/'@/views/components-demo/draggable'),loading: Loading});
const Clipboard = Loadable({loader: () => import('@/views/clipboard'), loading:Loading})
const Menu1_1 = Loadable({loader: () => import(/*webpackChunkName:'Menu1_1'*/'@/views/nested/menu1/menu1-1'),loading: Loading});
const Menu1_2_1 = Loadable({loader: () => import(/*webpackChunkName:'Menu1_2_1'*/'@/views/nested/menu1/menu1-2/menu1-2-1'),loading: Loading});
export default [
	{path: '/dashboard', component: Dashboard, roles:["admin","editor","guest"]},
	{ path: "/bug", component: Bug, roles: ["admin"] },
	{ path: "/permission/explanation", component: Explanation, roles: ["admin"] },
	{ path: "/permission/adminPage", component: AdminPage, roles: ["admin"] },
	{ path: "/permission/guestPage", component: GuestPage, roles: ["guest"] },
	{ path: "/permission/editorPage", component: EditorPage, roles: ["editor"] },
	{ path: "/components/richTextEditor", component: RichTextEditor, roles: ["admin","editor"] },
	{ path: "/components/Markdown", component: Markdown, roles: ["admin","editor"] },
	{ path: "/components/draggable", component: Draggable, roles: ["admin","editor"] },
	{ path: '/clipboard', component: Clipboard, roles:["admin","editor","guest"]},
	{ path: "/nested/menu1/menu1-1", component: Menu1_1, roles: ["admin","editor"] },
	{ path: "/nested/menu1/menu1-2/menu1-2-1", component: Menu1_2_1, roles: ["admin","editor"] },
]

const menuList = [
	{
		title: '首页',
		path: '/dashboard',
		icon: 'home',
		roles: ['admin','editor','guest']
	},
	{
		title: "组件",
		path: "/components",
		icon: "appstore",
		roles:["admin","editor"],
		children: [
			{
				title: "富文本",
				path: "/components/richTextEditor",
				roles:["admin","editor"],
			},
			{
				title: "Markdown",
				path: "/components/Markdown",
				roles:["admin","editor"],
			},
			{
				title: "拖拽列表",
				path: "/components/draggable",
				roles:["admin","editor"],
			},
		],
	},
	{
		title: "路由嵌套",
		path: "/nested",
		icon: "cluster",
		roles:["admin","editor"],
		children: [
			{
				title: "菜单1",
				path: "/nested/menu1",
				children: [
					{
						title: "菜单1-1",
						path: "/nested/menu1/menu1-1",
						roles:["admin","editor"],
					},
					{
						title: "菜单1-2",
						path: "/nested/menu1/menu1-2",
						children: [
							{
								title: "菜单1-2-1",
								path: "/nested/menu1/menu1-2/menu1-2-1",
								roles:["admin","editor"],
							},
						],
					},
				],
			},
		],
	},
	{
		title: "剪贴板",
		path: "/clipboard",
		icon: "copy",
		roles:["admin","editor"]
	},
	{
		title: "表格",
		path: '/table',
		icon: 'table',
		roles: ["admin","editor",'guest']
	}
	// {
	// 	title: "Bug收集",
	// 	path: "/bug",
	// 	icon: "bug",
	// 	roles:["admin"]
	// },
]
export default menuList

import { v4 as uuid } from 'uuid';

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '/dashboard'
	},
	{
		id: uuid(),
		title: 'User Management',
		icon: 'user',
		children: [
			{ id: uuid(), link: '/user-management/users', name: 'Manage User' },
			{ id: uuid(), link: '/user-management/users/add-user', name: 'Add User' },
			{ id: uuid(), link: '/user-management/self-restriction', name: 'Self Restriction' },
			{ id: uuid(), link: '/user-management/domain-restriction', name: 'Domain Restriction' },
		]
	},
	{
		id: uuid(),
		title: 'Library & Department',
		icon: 'clipboard',
		children: [
			{ id: uuid(), link: '/library-department/institute', name: 'Institutes' },
			{ id: uuid(), link: '/library-department/library', name: 'Library' },
			{ id: uuid(), link: '/library-department/department', name: 'Department' },
			{ id: uuid(), link: '/library-department/user-type', name: 'User type' },
			{ id: uuid(), link: '/library-department/content-group', name: 'Content Group' },
			{ id: uuid(), link: '/library-department/program', name: 'Program' },
			{ id: uuid(), link: '/library-department/service-group', name: 'servicegroup' },
			
		]
	},
	{
		id: uuid(),
		title: 'Resources',
		icon: 'layers',
		children: [	
			{ id: uuid(), link: '/resources/item-types', name: 'Item types' },
			{ id: uuid(), link: '/resources/publisher-package', name: 'Publisher package' },
			{ id: uuid(), link: '/resources/publishers', name: 'Publishers' },
			{ id: uuid(), link: '/resources/item', name: 'item' },
			{ id: uuid(), link: '/resources/news-clippings', name: 'News Clipping' },
		]
	},
	{
		id: uuid(),
		title: 'Notification',
		icon: 'bell',
		children: [	
			{ id: uuid(), link: '/notification/email', name: 'E-Mail' },
			{ id: uuid(), link: '/notification/send-emails', name: 'Send Mail' },
		]
	},
	{
		id: uuid(),
		title: 'Configuration',
		icon: 'lock',
		children: [
			{ id: uuid(), link: '/configuration/landing-page', name: 'Landing page' },	
			{ id: uuid(), link: '/configuration/categories', name: 'Categories' },	
			{ id: uuid(), link: '/configuration/collection', name: 'Collection' },	
			{ id: uuid(), link: '/configuration/media', name: 'Media' },	
			{ id: uuid(), link: '/configuration/metas', name: 'Important Link' },	
			{ id: uuid(), link: '/configuration/trending-books', name: 'Trending Books' },	
			{ id: uuid(), link: '/configuration/dynamic-page', name: 'Dynamic Page' },	
			{ id: uuid(), link: '/configuration/footer', name: 'Footer' },	
			{ id: uuid(), link: '/configuration/notice', name: 'Notices' },	
			{ id: uuid(), link: '/configuration/harvest-data', name: 'Harvest Data' },	
			{ id: uuid(), link: '/configuration/staff-recommendation', name: 'Staff Pick' },	
		]
	},
	// {
	// 	id: uuid(),
	// 	title: 'Layouts',
	// 	icon: 'layout',
	// 	link: '/layout-vertical'
	// },	
	// {
	// 	id: uuid(),
	// 	title: 'UI COMPONENTS',
	// 	grouptitle: true
	// },	
	// {
	// 	id: uuid(),
	// 	title: 'Components',
	// 	icon: 'monitor',
	// 	children: [
	// 		{ id: uuid(), link: '/components/accordions', name: 'Accordions' },
	// 		{ id: uuid(), link: '/components/alerts', name: 'Alerts' },
	// 		{ id: uuid(), link: '/components/badges', name: 'Badges' },
	// 		{ id: uuid(), link: '/components/breadcrumbs', name: 'Breadcrumbs' },
	// 		{ id: uuid(), link: '/components/buttons', name: 'Buttons' },
	// 		{ id: uuid(), link: '/components/button-group', name: 'ButtonGroup' },
	// 		{ id: uuid(), link: '/components/cards', name: 'Cards' },
	// 		{ id: uuid(), link: '/components/carousels', name: 'Carousel' },
	// 		{ id: uuid(), link: '/components/close-button', name: 'Close Button' },
	// 		{ id: uuid(), link: '/components/collapse', name: 'Collapse' },
	// 		{ id: uuid(), link: '/components/dropdowns', name: 'Dropdowns' },
	// 		{ id: uuid(), link: '/components/list-group', name: 'Listgroup' },
	// 		{ id: uuid(), link: '/components/modal', name: 'Modal' },
	// 		{ id: uuid(), link: '/components/navs', name: 'Navs' },
	// 		{ id: uuid(), link: '/components/navbar', name: 'Navbar' },
	// 		{ id: uuid(), link: '/components/offcanvas', name: 'Offcanvas' },
	// 		{ id: uuid(), link: '/components/overlays', name: 'Overlays' },
	// 		{ id: uuid(), link: '/components/pagination', name: 'Pagination' },
	// 		{ id: uuid(), link: '/components/popovers', name: 'Popovers' },
	// 		{ id: uuid(), link: '/components/progress', name: 'Progress' },
	// 		{ id: uuid(), link: '/components/spinners', name: 'Spinners' },
	// 		{ id: uuid(), link: '/components/tables', name: 'Tables' },
	// 		{ id: uuid(), link: '/components/toasts', name: 'Toasts' },
	// 		{ id: uuid(), link: '/components/tooltips', name: 'Tooltips' }
	// 	]
	// },	
	// {
	// 	id: uuid(),
	// 	title: 'Menu Level',
	// 	icon: 'corner-left-down',
	// 	children: [
	// 		{ 
	// 			id: uuid(), 
	// 			link: '#', 
	// 			title: 'Two Level',
	// 			children: [
	// 				{ id: uuid(), link: '#', name: 'NavItem 1'},
	// 				{ id: uuid(), link: '#', name: 'NavItem 2' }
	// 			]
	// 		},
	// 		{ 
	// 			id: uuid(), 
	// 			link: '#', 
	// 			title: 'Three Level',
	// 			children: [
	// 				{ 
	// 					id: uuid(), 
	// 					link: '#', 
	// 					title: 'NavItem 1',
	// 					children: [
	// 						{ id: uuid(), link: '#', name: 'NavChildItem 1'},
	// 						{ id: uuid(), link: '#', name: 'NavChildItem 2'}
	// 					]
	// 				},
	// 				{ id: uuid(), link: '#', name: 'NavItem 2' }
	// 			]
	// 		}
	// 	]
	// },	
	// {
	// 	id: uuid(),
	// 	title: 'Documentation',
	// 	grouptitle: true
	// },
	// {
	// 	id: uuid(),
	// 	title: 'Docs',
	// 	icon: 'clipboard',
	// 	link: '/documentation'
	// },
	// {
	// 	id: uuid(),
	// 	title: 'Changelog',
	// 	icon: 'git-pull-request',
	// 	link: '/changelog'
	// },
	// {
	// 	id: uuid(),
	// 	title: 'Download',
	// 	icon: 'download',
	// 	link: 'https://codescandy.gumroad.com/l/dashui-nextjs'
	// }
];

export default DashboardMenu;

import { v4 as uuid } from 'uuid';

export const useDashboardMenu = () => {
    // Function to get user role from cookies
    const getUserRole = () => {
        if (typeof window !== "undefined") { 
            const cookieString = document.cookie
                .split("; ")
                .find((row) => row.startsWith("user_role="));
            return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
        }
        return null;
    };

    const userRole = getUserRole();
    console.log("User Role:", userRole);

    const menu = [
        { id: uuid(), title: 'Dashboard', icon: 'home', link: '/dashboard' },
        {
            id: uuid(),
            title: 'User Management',
            icon: 'user',
            children: [
                { id: uuid(), link: '/user-management/users', name: 'Manage User' },
                { id: uuid(), link: '/user-management/users/add-user', name: 'Add User' },
                { id: uuid(), link: '/user-management/admin/add-admin', name: 'Add Admin' },
                { id: uuid(), link: '/user-management/admin', name: 'Manage Admin' },
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
                { id: uuid(), link: '/library-department/user-type', name: 'User Type' },
                { id: uuid(), link: '/library-department/content-group', name: 'Content Group' },
                { id: uuid(), link: '/library-department/program', name: 'Program' },
                { id: uuid(), link: '/library-department/service-group', name: 'Service Group' },
            ]
        }
    ];

    if (userRole === "ADMIN") {
        menu.push({
            id: uuid(),
            title: 'Resources',
            icon: 'layers',
            children: [
                { id: uuid(), link: '/resources/item-types', name: 'Item Types' },
                { id: uuid(), link: '/resources/publisher-package', name: 'Publisher Package' },
                { id: uuid(), link: '/resources/publishers', name: 'Publishers' },
                { id: uuid(), link: '/resources/item', name: 'Item' },
                { id: uuid(), link: '/resources/news-clippings', name: 'News Clipping' },
            ]
        });
    }

    menu.push(
        {
            id: uuid(),
            title: 'Reports',
            icon: 'bell',
            children: [
                { id: uuid(), link: '/reports/total-users', name: 'Total Users' },
                { id: uuid(), link: '/reports/top-users', name: 'Top Users' },
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
        }
    );

    const configMenu = [
        { id: uuid(), link: '/configuration/landing-page', name: 'Landing Page' },
        { id: uuid(), link: '/configuration/metas', name: 'Important Link' },
        { id: uuid(), link: '/configuration/trending-books', name: 'Trending Books' },
        { id: uuid(), link: '/configuration/dynamic-page', name: 'Dynamic Page' },
        { id: uuid(), link: '/configuration/footer', name: 'Footer' },
        { id: uuid(), link: '/configuration/notice', name: 'Notices' },
        { id: uuid(), link: '/configuration/harvest-data', name: 'Harvest Data' },
        { id: uuid(), link: '/configuration/staff-recommendation', name: 'Staff Pick' },
    ];

    if (userRole === "ADMIN") {
        configMenu.unshift( // Add extra options at the beginning for ADMIN
            { id: uuid(), link: '/configuration/categories', name: 'Categories' },
            { id: uuid(), link: '/configuration/collection', name: 'Collection' },
            { id: uuid(), link: '/configuration/media', name: 'Media' }
        );
    }

    menu.push({ id: uuid(), title: 'Configuration', icon: 'lock', children: configMenu });

    return menu;
};

export default useDashboardMenu;

import { v4 as uuid } from 'uuid';
import { useSelector } from "react-redux";

export const useDashboardMenu = () => {
    const user = useSelector((state) => state.user.user);

    console.log("user details", user);

    return [
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
            title: 'Reports',
            icon: 'bell',
            children: [
                { id: uuid(), link: '/reports/total-users', name: 'Total users' },
                { id: uuid(), link: '/reports/top-users', name: 'Top-users' },
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
        }
    ];
};

export default useDashboardMenu;

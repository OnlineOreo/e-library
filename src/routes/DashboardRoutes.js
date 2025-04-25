import LanguageSelector from "@/app/Component/landing-page/languageselector";
import { v4 as uuid } from "uuid";

import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`

export const useDashboardMenu = () => {
  const { t, i18n } = useTranslation();
  const getUserRole = () => {
    if (typeof window !== "undefined") {
      const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_role="));
      return cookieString
        ? decodeURIComponent(cookieString.split("=")[1])
        : null;
    }
    return null;
  };

  const userRole = getUserRole();

  const menu = [
    { id: uuid(), title: t('Dashboard'), icon: "home", link: "/dashboard" },
  ];

  if (userRole === "ADMIN") {
    menu.push(
      
      {
        id: uuid(),
        title: t("User Management"),
        icon: "user",
        children: [
          { id: uuid(), link: "/user-management/users", name: t("Manage User") },
          { id: uuid(), link: "/user-management/admin", name: t("Manage Admin") },

        ],
      }
    );
  } else {
    menu.push({
      id: uuid(),
      title: t("User Management"),
      icon: "user",
      children: [
        { id: uuid(), link: "/user-management/users", name: t("Manage User") },
      ],
    });
  }
  if (userRole === "ADMIN") {
    menu.push({
      id: uuid(),
      title: t("Library & Department"),
      icon: "clipboard",
      children: [
        {
          id: uuid(),
          link: "/library-department/institute",
          name: t("Institutes"),
        },
        { id: uuid(), link: "/library-department/library", name: t("Library") },
        {
          id: uuid(),
          link: "/library-department/department",
          name: t("Department"),
        },
        {
          id: uuid(),
          link: "/library-department/user-type",
          name: t("User Type"),
        },
        {
          id: uuid(),
          link: "/library-department/content-group",
          name: t("Content Group"),
        },
        { id: uuid(), link: "/library-department/program", name: t("Program") },
        {
          id: uuid(),
          link: "/library-department/service-group",
          name: t("Service Group"),
        },
      ],
    });
  } else {
    menu.push({
      id: uuid(),
      title: t("Library & Department"),
      icon: "clipboard",
      children: [
        { id: uuid(), link: "/library-department/library", name: t("Library") },
        {
          id: uuid(),
          link: "/library-department/department",
          name: t("Department"),
        },
        {
          id: uuid(),
          link: "/library-department/user-type",
          name: t("User Type"),
        },
        {
          id: uuid(),
          link: "/library-department/content-group",
          name: t("Content Group"),
        },
        { id: uuid(), link: "/library-department/program", name: t("Program") },
        {
          id: uuid(),
          link: "/library-department/service-group",
          name: t("Service Group"),
        },
      ],
    });
  }
  if (userRole === "ADMIN") {
    menu.push({
      id: uuid(),
      title: t("Resources"),
      icon: "layers",
      children: [
        { id: uuid(), link: "/resources/item-types", name: t("Item Types") },
        { id: uuid(), link: "/resources/item", name: t("Items") },
        { id: uuid(), link: "/resources/publishers", name: t("Publishers")},
        
        {
          id: uuid(),
          link: "/resources/publisher-package",
          name: t("Publisher Package"),
        },
       
      ],
    });
  }else{
    menu.push({
      id: uuid(),
      title: t("Resources"),
      icon: "layers",
      children: [
        { id: uuid(), link: "/resources/item", name: t("Items") },
      ],
    });
  }

  menu.push(
    {
      id: uuid(),
      title: t("Reports"),
      icon: "layout",
      children: [
        { id: uuid(), link: "/reports/total-users", name: t("User Report") },
        { id: uuid(), link: "/reports/Resource-reports", name: t("Resource Reports") },
        // { id: uuid(), link: '/reports/top-users', name: 'Top Users' },
      ],
    },
    {
      id: uuid(),
      title: t("Notification"),
      icon: "bell",
      children: [
        { id: uuid(), link: "/notification/send-email", name: t("Send Mail") },
        {
          id: uuid(),
          link: "/notification/emails-sent",
          name: t("View Send Mails"),
        },
      ],
    }
  );

  const configMenu = [
    { id: uuid(), link: "/configuration/landing-page", name: t("Landing Page") },
    { id: uuid(), link: "/configuration/metas", name: t("Important Link") },
    {
      id: uuid(),
      link: "/configuration/trending-books",
      name: t("Trending Books"),
    },
    { id: uuid(), link: "/configuration/dynamic-page", name: t("Dynamic Page") },
    { id: uuid(), link: "/configuration/footer", name: t("Footer") },
    { id: uuid(), link: "/configuration/notice", name: t("Notices") },
    // { id: uuid(), link: '/configuration/harvest-data', name: 'Harvest Data' },
    { id: uuid(), link: "/resources/news-clippings", name: t("News Clipping") },
    {
      id: uuid(),
      link: "/configuration/staff-recommendation",
      name: t("Staff Pick"),
    },
  ];

  if (userRole === "ADMIN") {
    configMenu.unshift(
      { id: uuid(), link: "/configuration/categories", name: t("Categories") },
      { id: uuid(), link: "/configuration/collection", name: t("Collection") },
      { id: uuid(), link: "/configuration/media", name: t("Media") }
    );
  }

  menu.push({
    id: uuid(),
    title: t("Configuration"),
    icon: "lock",
    children: configMenu,
  });
  
  // if(userRole === "ADMIN"){
  //   menu.push(  {
  //     id: uuid(),
  //     title: "View Logs",
  //     icon: "git-pull-request",
  //     link: "/logs",
  //   })
  // }

  return menu;
};

export default useDashboardMenu;

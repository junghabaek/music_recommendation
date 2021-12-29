import React from "react";
import * as BsIcons from "react-icons/bs";
export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <BsIcons.BsFillHouseDoorFill />,
        cName: "nav-text",
    },
    {
        title: "로그인",
        path: "/login",
        icon: <BsIcons.BsPersonBoundingBox />,
        cName: "nav-text",
    },
    {
        title: "영화추천",
        path: "/service",
        icon: <BsIcons.BsFillInfoCircleFill />,
        cName: "nav-text",
    },
    {
        title: "Contact Us",
        path: "/Contact",
        icon: <BsIcons.BsEnvelopeFill />,
        cName: "nav-text",
    },
];

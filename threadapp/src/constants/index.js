"use client ";

import { useGlobalContext } from "@/Context/store";

export const sidebarLinks = () => {
  const { data, setData } = useGlobalContext();

  return [
    {
      imgURL: "/assets/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/assets/search.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "/assets/heart.svg",
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: "/assets/create.svg",
      route: "/create-thread",
      label: "Create Thread",
    },
    {
      imgURL: "/assets/community.svg",
      route: "/communities",
      label: "Communities",
    },
    {
      imgURL: "/assets/user.svg",
      route: `/profile/${data.username}`,
      label: "Profile",
    },
  ];
};
export const profileTabs = [
  {
    value: "threads",
    route: "/profile/threads",
    label: "Threads",
    icon: "/assets/reply.svg",
  },
  {
    value: "replies",
    route: "/profile/replies",
    label: "Replies",
    icon: "/assets/members.svg",
  },
  {
    value: "tagged",
    route: "/profile/tagged",
    label: "Tagged",
    icon: "/assets/tag.svg",
  },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];

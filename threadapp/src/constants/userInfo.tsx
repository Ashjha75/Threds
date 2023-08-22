"use client";
import { useGlobalContext } from "@/Context/store";

const userInfo = () => {
  const { data, setData } = useGlobalContext();
  const user = { username: data.username, id: data._id };
  return { user };
};

export default userInfo;

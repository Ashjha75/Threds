"use client";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchUsersData } from "@/lib/helpers/UserData";
import { decodeToken, fetchData } from "@/lib/helpers/tokenData";
import User from "@/lib/models/user.model";
import { NextRequest } from "next/server";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

type DataType = {
  firstName: string;
};

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  data: {},
  setData: () => {},
});

export const GlobalContextProvider = (
  { children }: any,
  request: NextRequest
) => {
  //   const [userId, setUserId] = useState("");
  const [data, setData] = useState({});
  const [userId, setUserId] = useState("");
  useEffect(() => {
    fetchData(request)
      .then((decodedUserId: any) => {
        setUserId(decodedUserId);
      })
      .catch((error: any) => {
        console.error("Error decoding token:", error);
      });
  }, []);
  //   setData(User.findById({ id: userId }));
  //   console.log(User.findById({ id: userId }));
  //   useEffect(() => {
  //     fetchUsersData(userId)
  //       .then((user: any) => setData(user))
  //       .catch((error: any) => {
  //         console.error("Error decoding token:", error);
  //       });
  //   });
  //   console.log(fetchUser(userId));
  return (
    <GlobalContext.Provider value={{ userId, setUserId, data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

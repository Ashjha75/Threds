"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { NextRequest } from "next/server";
import { fetchData } from "@/lib/helpers/tokenData";

export type DataType = {
  _id: string;
  id: string;
  username: string;
  image: string;
  email: string;
  name: string;
  ping: number;
  onboarded: boolean;
};

interface ContextProps {
  data: DataType; // Change to DataType, not DataType[]
  setData: Dispatch<SetStateAction<DataType>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: () => {},
  data: {
    _id: "",
    id: "",
    username: "",
    image: "",
    email: "",
    name: "",
    ping: 0,
    onboarded: false,
  },
  setData: () => {},
});

export const GlobalContextProvider = (
  { children }: any,
  request: NextRequest
) => {
  const [data, setData] = useState<DataType>({
    // Specify the DataType type
    _id: "",
    id: "",
    username: "",
    image: "",
    email: "",
    name: "",
    ping: 0,
    onboarded: false,
  });

  useEffect(() => {
    fetchData(request)
      .then((decodedData: any) => {
        setData({
          _id: decodedData._id,
          id: decodedData.id,
          username: decodedData.username,
          email: decodedData.email,
          image: decodedData.image,
          name: decodedData.name,
          ping: decodedData.newActivity,
          onboarded: decodedData.onboarded,
        });
      })
      .catch((error: any) => {
        console.error("Error decoding token:", error);
      });
  }, []);
  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

import { getLoggedinUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect } from "react";



const GlobalCxt = createContext<any>(null);

export const GlobalProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getLoggedinUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalCxt.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        setIsLoading,
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </GlobalCxt.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalCxt);

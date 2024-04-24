import { ReactNode, createContext, useState } from "react";

interface PropType {
  children: ReactNode
}

interface ContextType {
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export const TokenContext = createContext<ContextType | null>(null);

export const TokenProvider = ({children}: PropType) => {
  const [token, setToken] = useState<string>("");

  return (
    <TokenContext.Provider value={{token, setToken}}>
      {children}
    </TokenContext.Provider>
  )
}
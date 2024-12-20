import { createContext, useState } from "react";

export let TokenContext = createContext();
export default function TokenContextprovider(props) {

  const [token, setToken] = useState()
  const [userData, setUserData] = useState(null)

  return <TokenContext.Provider value={{ token, setToken ,userData, setUserData}}>
    {props.children}
  </TokenContext.Provider>
} 
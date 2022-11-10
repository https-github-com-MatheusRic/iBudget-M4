import { createContext, Dispatch, ReactNode, useState } from "react";

interface IBtnChangeTeam{
  clickToChange : boolean,
  setClickToChange: Dispatch<boolean>,
}

export interface IBtnChangeTeamChildren {
  children: ReactNode;
}


export const BntChangeTeamContext = createContext<IBtnChangeTeam>({} as IBtnChangeTeam)


const BtnProvider = ({children}:IBtnChangeTeamChildren ) => {
  const [clickToChange, setClickToChange] = useState<boolean>(false)
  return (
    <BntChangeTeamContext.Provider value={{clickToChange, setClickToChange}}>
        {children}
 </BntChangeTeamContext.Provider>
  )
}
export default BtnProvider
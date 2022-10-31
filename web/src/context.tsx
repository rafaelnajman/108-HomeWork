import { createContext, ReactNode, useEffect, useState } from "react";

interface IContext {
  isVisual: boolean;
  setIsVisual: (isVisual: boolean) => void;
}

interface IProps {
  children: ReactNode;
}

export const Context = createContext<IContext>({} as IContext);

export function ContextProvider({ children }: IProps): JSX.Element {
  const [isVisual, setIsVisual] = useState(true);

  return (
    <Context.Provider value={{ isVisual, setIsVisual }}>
      {children}
    </Context.Provider>
  );
}

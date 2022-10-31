import { useContext } from "react";
import { Context } from "../../../context";

type ButtonProps = {
  children: React.ReactNode;
};

export function Button({ children }: ButtonProps): JSX.Element {
  const { isVisual, setIsVisual } = useContext(Context);
  let isButtonVisual;
  if (children?.toString() === "Visual") {
    isButtonVisual = true;
  } else {
    isButtonVisual = false;
  }
  return (
    <>
      {isButtonVisual ? (
        <button
          onClick={() => setIsVisual(true)}
          className={`px-8 py-4 rounded-sm shadow ${
            isVisual
              ? "bg-slate-800 hover:bg-slate-600 text-white"
              : "bg-white hover:bg-slate-400"
          } transition-colors`}
        >
          {children}
        </button>
      ) : (
        <button
          onClick={() => setIsVisual(false)}
          className={`px-8 py-4  rounded-sm shadow ${
            !isVisual
              ? "bg-slate-800 hover:bg-slate-600 text-white"
              : "bg-white hover:bg-slate-400"
          } transition-colors`}
        >
          {children}
        </button>
      )}
    </>
  );
}

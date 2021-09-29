import { useCallback, useState } from "react";
import { IoSquareOutline } from "react-icons/io5";
import { IoCheckboxOutline } from "react-icons/io5";

export const HandleDone = () => {
  const [isDone, setIsDone] = useState(false);
  const handleClick = useCallback(() => {
    setIsDone((isDone) => {
      return !isDone;
    });
  }, []);
  return (
    <button onClick={handleClick}>
      {isDone ? (
        <IoCheckboxOutline size={20} color={"#5A5A5A"} className="mr-2" />
      ) : (
        <IoSquareOutline size={20} color={"#5A5A5A"} className="mr-2" />
      )}
    </button>
  );
};

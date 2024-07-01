import React, { useContext } from "react";
import { AppContext } from "../../App";

export const DropDownMenu = () => {
  const { handleLogout } = useContext(AppContext);



  return (
    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-50">
      <ul>
        <li>
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200" >
            Account details
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

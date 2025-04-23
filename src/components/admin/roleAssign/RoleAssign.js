import { DataContext } from "../../helper/HelperOne";
import { useState } from "react";
import NavBar from "../nav_bar/Navbar";
import RoleAssignList from "./RoleAssignList";

function RoleAssign() {
  const [searchUi, setSearchUi] = useState(true);
  const [searchData, setSearchData] = useState(null);

  return (
    <DataContext.Provider
      value={{ searchUi, setSearchUi, searchData, setSearchData }}
    >
      <NavBar childrenPage={<RoleAssignList />} menuId={5} />
    </DataContext.Provider>
  );
}

export default RoleAssign;

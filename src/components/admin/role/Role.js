import { DataContext } from "../../helper/HelperOne";
import { useState } from "react";
import NavBar from "../nav_bar/Navbar";
import RoleList from "./RoleList";

function Roles() {
  const [searchUi, setSearchUi] = useState(true);
  const [searchData, setSearchData] = useState(null);

  return (
    <DataContext.Provider
      value={{ searchUi, setSearchUi, searchData, setSearchData }}
    >
      <NavBar childrenPage={<RoleList />} menuId={6} />
    </DataContext.Provider>
  );
}

export default Roles;

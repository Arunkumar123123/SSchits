import { useState } from "react";


import { DataContext } from "../../../Context/HelperOne";
import NavBar from "../nav_bar/Navbar";
import GroupList from "./GroupList";

const Group = () => {
    const [searchUi, setSearchUi] = useState(true)
    const [searchData, setSearchData] = useState(null)
  return (
    <DataContext.Provider value={{ searchUi, setSearchUi, searchData, setSearchData }}>
    <NavBar
      childrenPage={<GroupList />}
      menuId={4}
    />
  </DataContext.Provider>
  )
}

export default Group

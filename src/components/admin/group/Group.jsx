import { DataContext } from "../../helper/HelperOne";
import { useState } from "react";
import NavBar from "../nav_bar/Navbar";

const Group = () => {
    const [searchUi, setSearchUi] = useState(true)
    const [searchData, setSearchData] = useState(null)
  return (
    <DataContext.Provider value={{ searchUi, setSearchUi, searchData, setSearchData }}>
    <NavBar
      childrenPage={<Group />}
      menuId={3}
    />
  </DataContext.Provider>
  )
}

export default Group

import { useState } from "react";


import { DataContext } from "../../../Context/HelperOne";
import NavBar from "../nav_bar/Navbar";
import PlanList from "./PlanList";


const Plan = () => {
    const [searchUi, setSearchUi] = useState(true)
    const [searchData, setSearchData] = useState(null)
  return (
    <DataContext.Provider value={{ searchUi, setSearchUi, searchData, setSearchData }}>
    <NavBar
      childrenPage={<PlanList />}
      menuId={3}
    />
  </DataContext.Provider>
  )
}

export default Plan

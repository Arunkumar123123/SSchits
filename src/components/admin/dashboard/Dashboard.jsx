import { DataContext } from "../../helper/HelperOne";
import { useState } from "react";
import NavBar from "../nav_bar/Navbar";
import DashboardList from "./DashboardList";

const Dashboard = () => {
    const [searchUi, setSearchUi] = useState(true)
    const [searchData, setSearchData] = useState(null)

  return (
       <DataContext.Provider value={{searchUi, setSearchUi, searchData, setSearchData}}>
            <NavBar
                childrenPage={<DashboardList/>}
                menuId={1}
            />
        </DataContext.Provider>
  )
}

export default Dashboard

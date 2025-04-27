import { useState } from "react";


import { DataContext } from "../../../Context/HelperOne";
import NavBar from "../nav_bar/Navbar";
import CustomerList from "./CustomerList";

const Customer = () => {
  const [searchUi, setSearchUi] = useState(true)
  const [searchData, setSearchData] = useState(null)
  return (
    <DataContext.Provider value={{ searchUi, setSearchUi, searchData, setSearchData }}>
      <NavBar
        childrenPage={<CustomerList />}
        menuId={2}
      />
    </DataContext.Provider>
  )
}

export default Customer

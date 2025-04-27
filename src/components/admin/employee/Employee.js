import { DataContext } from "../../../Context/HelperOne";
import {useState} from "react";
import NavBar from "../nav_bar/Navbar";
import EmployeeList from "./EmployeeList";


function Employee() {
    const [searchUi, setSearchUi] = useState(true)
    const [searchData, setSearchData] = useState(null)

    return (

        <DataContext.Provider value={{searchUi, setSearchUi, searchData, setSearchData}}>
            <NavBar
                childrenPage={<EmployeeList/>}
                menuId={2}
            />
        </DataContext.Provider>
    )
}

export default Employee
import { DataContext } from "../../../Context/HelperOne";
import {useState} from "react";
import NavBar from "../../nav_bar/Navbar";
import EmployeeDesignationList from "./EmployeeDesignationList";


function EmployeeDesignation() {
    const [searchUi, setSearchUi] = useState(true)
    const [searchData, setSearchData] = useState(null)

    return (

        <DataContext.Provider value={{searchUi, setSearchUi, searchData, setSearchData}}>
            <NavBar
                childrenPage={<EmployeeDesignationList/>}
                menuId={6}
            />
        </DataContext.Provider>
    )
}

export default EmployeeDesignation
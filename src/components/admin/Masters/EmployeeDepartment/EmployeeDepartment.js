import {DataContext} from "../../../helper/HelperOne";
import {useState} from "react";
import NavBar from "../../nav_bar/Navbar";
import EmployeeDepartmentList from './EmployeeDepartmentList'


function EmployeeDepartment() {
    const [searchUi, setSearchUi] = useState(true)
    const [searchData, setSearchData] = useState(null)

    return (

        <DataContext.Provider value={{searchUi, setSearchUi, searchData, setSearchData}}>
            <NavBar
                childrenPage={<EmployeeDepartmentList/>}
                menuId={6}
            />
        </DataContext.Provider>
    )
}

export default EmployeeDepartment

export const employeePermission = () => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || Object.keys(storedUser).length === 0) {
        return false;
    }

    const employeeRoleBasedAccess = storedUser.employee_role_based_access;
    return employeeRoleBasedAccess.some((access) => parseInt(access.label_value, 10) === 1);
};


export const roleCreatePermission = () => {

    const roleId = JSON.parse(localStorage.getItem('role_id'));
    if(roleId && localStorage.getItem('role_id')==1){
        return true;
    }

    return false;
};


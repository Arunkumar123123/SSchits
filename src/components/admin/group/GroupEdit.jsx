import React, { useEffect, useState } from 'react'

const GroupEdit = ({close,}) => {

    const [formData, setFormData] = useState({
        plan_id: "",
        group_name: "",
        customers_count: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>

        </div>
    )
}

export default GroupEdit

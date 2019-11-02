const orginizationRoleMapper = (value => {
    switch (value) {
        case "corporate_employee":
            return "کارمند شرکتی"

        case "contract_employee":
            return "کارمند قراردادی"

        case "department_head":
            return "رییس اداره"

        case "director_general":
            return "مدیر کل"

        default:
            break;
    }
})

const userRolesMapper = (values => {

    let mappedList = []
    values.map(value => {
        switch (value) {
            case "Admin":
                mappedList = [...mappedList, "مدیر سیستم"]
                break;
            case "PP_Admin":
                mappedList = [...mappedList, "مدیر پست و پیشخوان"]
                break;
            case "PP_User_L1":
                mappedList = [...mappedList, "کاربر پست و پیشخوان سطح 1"]
                break;
            case "PP_User_L2":
                mappedList = [...mappedList, "کاربر پست و پیشخوان سطح 2"]
                break;
            case "Vill_Admin":
                mappedList = [...mappedList, "مدیر روستایی"]
                break;
            case "Vill_User_L1":
                mappedList = [...mappedList, "کاربر روستایی سطح 1"]
                break;
            case "Vill_User_L2":
                mappedList = [...mappedList, "کاربر روستایی سطح 2"]
                break;
            default:
                break;
        }

    })
    return mappedList
})

module.exports = {
    orginizationRoleMapper,
    userRolesMapper
}
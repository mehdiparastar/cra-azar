const rolesPermissions = [
    {
        role: 'Admin',
        permission: [
            'Admin',
            'PP_Admin',
            'PP_User_L1',
            'PP_User_L2',
            'Vill_Admin',
            'Vill_User_L1',
            'Vill_User_L2'
        ]
    },

    {
        role: 'PP_Admin',
        permission: ['PP_Admin', 'PP_User_L1', 'PP_User_L2']
    },

    {
        role: 'PP_User_L1',
        permission: ['PP_User_L1']
    },

    {
        role: 'PP_User_L2',
        permission: ['PP_User_L2']
    },

    {
        role: 'Vill_Admin',
        permission: ['Vill_Admin', 'Vill_User_L1', 'Vill_User_L2']
    },

    {
        role: 'Vill_User_L1',
        permission: ['Vill_User_L1']
    },

    {
        role: 'Vill_User_L2',
        permission: ['Vill_User_L2']
    }
];

const adminPermission = [
    { '/api/users/createuser': 'POST' },
    { '/api/users/allusers': 'GET' },
    { '/api/users/:id': 'GET' },
    { '/api/users/:id': 'PUT' }
]
const commonPermission = [{ '/api/users/userfirstname': 'GET' }, { '/api/users/useravatar': 'GET' }]
const ppAdminPermission = [{ '/api/test1': 'POST' }, { '/api/test1': 'GET' }]
const ppUserL1Permission = [{ '/api/test1': 'POST' }, { '/api/test1': 'GET' }]
const ppUserL2Permission = [{ '/api/test1': 'POST' }, { '/api/test1': 'GET' }]
const villAdminPermission = [{ '/api/test1': 'POST' }, { '/api/test1': 'GET' }]
const villUserL1Permission = [{ '/api/test1': 'POST' }, { '/api/test1': 'GET' }]
const villUserL2Permission = [{ '/api/test1': 'POST' }, { '/api/test1': 'GET' }]

const permissionAPIandMethod = [
    {
        permission: 'Admin',
        whitelist: [
            ...adminPermission,
            ...commonPermission,
            ...ppAdminPermission,
            ...ppUserL1Permission,
            ...ppUserL2Permission,
            ...villAdminPermission,
            ...villUserL1Permission,
            ...villUserL2Permission,
        ]
        // adminPermission.concat(commonPermission, post_pishkhanPermission, village_fix_wiredPermission, village_fix_wirelessPermission, village_mobilePermission)
    },
    {
        permission: 'PP_Admin',
        whitelist: [
            ...commonPermission,
            ...ppAdminPermission,
            ...ppUserL1Permission,
            ...ppUserL2Permission,
        ]
    },
    {
        permission: 'PP_User_L1',
        whitelist: [
            ...commonPermission,
            ...ppUserL1Permission,
        ]
    },
    {
        permission: 'PP_User_L2',
        whitelist: [
            ...commonPermission,
            ...ppUserL2Permission,
        ]
    },
    {
        permission: 'Vill_Admin',
        whitelist: [
            ...commonPermission,
            ...villAdminPermission,
            ...villUserL1Permission,
            ...villUserL2Permission,
        ]
    },
    {
        permission: 'Vill_User_L1',
        whitelist: [
            ...commonPermission,
            ...villUserL1Permission,
        ]
    },
    {
        permission: 'Vill_User_L2',
        whitelist: [
            ...commonPermission,
            ...villUserL2Permission,
        ]
    }
];

module.exports = {
    rolesPermissions,
    permissionAPIandMethod
};

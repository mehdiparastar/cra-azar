const rolesPermissions = [
    {
        role: 'مدیر سیستم',
        permission: [
            'مدیر سیستم',
            'مدیر پست و پیشخوان',
            'کاربر پست و پیشخوان سطح 1',
            'کاربر پست و پیشخوان سطح 2',
            'مدیر روستایی',
            'کاربر روستایی سطح 1',
            'کاربر روستایی سطح 2'
        ]
    },

    {
        role: 'مدیر پست و پیشخوان',
        permission: ['مدیر پست و پیشخوان', 'کاربر پست و پیشخوان سطح 1', 'کاربر پست و پیشخوان سطح 2']
    },

    {
        role: 'کاربر پست و پیشخوان سطح 1',
        permission: ['کاربر پست و پیشخوان سطح 1']
    },

    {
        role: 'کاربر پست و پیشخوان سطح 2',
        permission: ['کاربر پست و پیشخوان سطح 2']
    },

    {
        role: 'مدیر روستایی',
        permission: ['مدیر روستایی', 'کاربر روستایی سطح 1', 'کاربر روستایی سطح 2']
    },

    {
        role: 'کاربر روستایی سطح 1',
        permission: ['کاربر روستایی سطح 1']
    },

    {
        role: 'کاربر روستایی سطح 2',
        permission: ['کاربر روستایی سطح 2']
    }
];

const adminPermission = [
    { '/api/users/createuser': 'POST' },
    { '/api/users/allusers': 'GET' },
    { '/api/users/:id': 'GET' },
    { '/api/users/:id': 'PUT' },
    { '/api/users/tokens/:id': 'PUT' },
    { '/api/users/userReqLogs/:id': 'GET' },
    { '/api/users/account/:id': 'DELETE' }
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
        permission: 'مدیر سیستم',
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
        permission: 'مدیر پست و پیشخوان',
        whitelist: [
            ...commonPermission,
            ...ppAdminPermission,
            ...ppUserL1Permission,
            ...ppUserL2Permission,
        ]
    },
    {
        permission: 'کاربر پست و پیشخوان سطح 1',
        whitelist: [
            ...commonPermission,
            ...ppUserL1Permission,
        ]
    },
    {
        permission: 'کاربر پست و پیشخوان سطح 2',
        whitelist: [
            ...commonPermission,
            ...ppUserL2Permission,
        ]
    },
    {
        permission: 'مدیر روستایی',
        whitelist: [
            ...commonPermission,
            ...villAdminPermission,
            ...villUserL1Permission,
            ...villUserL2Permission,
        ]
    },
    {
        permission: 'کاربر روستایی سطح 1',
        whitelist: [
            ...commonPermission,
            ...villUserL1Permission,
        ]
    },
    {
        permission: 'کاربر روستایی سطح 2',
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

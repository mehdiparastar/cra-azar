const rolesPermissions = [
    {
        role: 'admin',
        permission: [
            'admin',
            'post_pishkhan',
            'village_fix_wired',
            'village_fix_wireless',
            'village_mobile'
        ]
    },

    {
        role: 'post_pishkhan_user',
        permission: ['post_pishkhan']
    },

    {
        role: 'village_fix_wired_user',
        permission: ['village_fix_wired']
    },

    {
        role: 'village_fix_wireless_user',
        permission: ['village_fix_wireless']
    },

    {
        role: 'village_mobile_user',
        permission: ['village_mobile']
    }
];

const adminPermission = [{ '/api/users/createuser': 'POST' }]
const commonPermission = [{ '/api/users/userfirstname': 'GET' }, { '/api/users/useravatar': 'GET' }]
const post_pishkhanPermission = [{ '/api/test1': 'POST' }, { '/api/test1': 'GET' }]
const village_fix_wiredPermission = [{ '/api/test1': 'POST' }, { '/api/test1': 'GET' }]
const village_fix_wirelessPermission = [{ '/api/test1': 'POST' }, { '/api/test1': 'GET' }]
const village_mobilePermission = [{ '/api/test1': 'POST' }, { '/api/test1': 'GET' }]

const permissionAPIandMethod = [
    {
        permission: 'admin',
        whitelist: adminPermission.concat(commonPermission, post_pishkhanPermission, village_fix_wiredPermission, village_fix_wirelessPermission, village_mobilePermission)
    },
    {
        permission: 'post_pishkhan',
        whitelist: commonPermission.concat(post_pishkhanPermission)
    },
    {
        permission: 'village_fix_wired',
        whitelist: commonPermission.concat(village_fix_wiredPermission)
    },
    {
        permission: 'village_fix_wireless',
        whitelist: commonPermission.concat(village_fix_wirelessPermission)
    },
    {
        permission: 'village_mobile',
        whitelist: commonPermission.concat(village_mobilePermission)
    }
];

module.exports = {
    rolesPermissions,
    permissionAPIandMethod
};

const rolesPermissions = [
    {
        role: 'admin',
        permission: ['post_pishkhan', 'village_fix_wired', 'village_fix_wireless', 'village_mobile']
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
    },
];

const permissionAPIandMethod = [
    {
        permission: 'post_pishkhan',
        whitelist: [
            { '/api/test11': 'POST' },
            { '/api/test1': 'GET' }
        ]
    },
    {
        permission: 'village_fix_wired',
        whitelist: [
            { '/api/test3': 'POST' },
            { '/api/test3': 'GET' }
        ]
    },
    {
        permission: 'village_fix_wireless',
        whitelist: [
            { '/api/test4': 'POST' },
            { '/api/test4': 'GET' }
        ]
    },
    {
        permission: 'village_mobile',
        whitelist: [
            { '/api/test5': 'POST' },
            { '/api/test5': 'GET' }
        ]
    },
]

module.exports = {
    rolesPermissions,
    permissionAPIandMethod
};

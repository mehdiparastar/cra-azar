const { rolesPermissions, permissionAPIandMethod } = require('../acl/acl');
const _ = require('lodash');
require('../utils/utils');

let accessControl = (req, res, next) => {
    try {
        const user = req.user;
        // const user_token = req.token;
        let permissions = [];
        user.roles.forEach(element => {
            permissions = [..._.filter(rolesPermissions, { role: element })[0].permission, ...permissions]
        });
        req.permissions = permissions.unique();
        
        let whitelist = [];
        permissions.forEach(element => {
            whitelist = [..._.filter(permissionAPIandMethod, { permission: element })[0].whitelist, ...whitelist];
        });
        req.whitelist = whitelist.unique();
        
        let req_path_method = {};
        req_path_method[req.originalUrl] = req.method;
        
        if (_.find(whitelist.unique(), req_path_method)) {
            next();
        } else {
            throw Error;
        }
    } catch (err) {
        res.status(405).send();
    }
};

module.exports = {
    accessControl
};

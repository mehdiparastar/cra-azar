const { rolesPermissions, permissionAPIandMethod } = require('../acl/acl');
const _ = require('lodash');
require('../utils/utils');

let accessControl = (req, res, next) => {

    try {
        const user = req.user;
        // const user_token = req.token;
        let permissions = [];
        user.userRoles.forEach(element => {
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

        whitelist.unique().map((item) => {
            if (Object.keys(item)[0].search(":") >= 0) {
                const sections = Object.keys(item)[0].split("/")
                let secnum
                sections.map((sec) => {
                    if (sec.search(":") >= 0) {
                        secnum = sections.indexOf(sec)
                    }
                })
                const list_a = [...sections]
                const list_b = [...Object.keys(req_path_method)[0].split("/")]
                list_a.pop(list_a[secnum])
                list_b.pop(list_b[secnum])
                if (list_a.join("/") === list_b.join("/")) {
                    sections[secnum] = Object.keys(req_path_method)[0].split("/")[secnum]
                    whitelist.map(row => {
                        if (Object.keys(row)[0] === Object.keys(item)[0]) {
                            const key = sections.join("/")
                            const value = Object.values(whitelist[whitelist.indexOf(row)])[0]
                            whitelist[whitelist.indexOf(row)] = Object({ [key]: value })
                        }
                    })
                }
            }
        })

        if (_.find(whitelist.unique(), req_path_method)) {
            next();
        } else {
            throw Error;
        }
    } catch (err) {
        console.log(err)
        res.status(405).send(err);
    }
};

module.exports = {
    accessControl
};

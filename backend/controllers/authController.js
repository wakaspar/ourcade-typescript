// Login account:
function login(req, res) {
    console.log('AUTHCONTROLLER LOGIN');
    console.log('=> /api/login/ req.user: ', JSON.stringify(req.user));
    console.log(' '); // new line placeholder
    res.send(req.user);
}
// TODO: This doesn't work, let's figure it out later...
// Logout account:
 function logout(req, res) {
    console.log('AUTHCONTROLLER LOGOUT');
    console.log("BEFORE logout", req);
    req.logout();
    res.send(req);
    console.log("AFTER logout", req);
}
// Export module methods:
module.exports = {
    login: login,
    logout: logout,
}
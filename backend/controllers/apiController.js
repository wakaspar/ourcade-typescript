// API : Route definitions
// Get API index
function index(req,res) {
    res.json({
        "name" : "ourcade-typescript backend API",
        "endpoints" : [
            "/api/", 
            "/api/scores",
            "/api/scores/:id",
            "/api/users",
            "/api/users/:id",
            "/api/signup",
            "/api/login",
            "/api/logout"
        ]
    });
}
// Export module methods
module.exports = {
  index: index
}

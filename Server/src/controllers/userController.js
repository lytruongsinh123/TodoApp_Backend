import userService from "../services/userService";
const handleUserPage = async (req, res) => {
    let data = await userService.getUserList();
    return res.render("user.ejs", { data });
};
const handleCreateNewUser = (req, res) => {
    userService.creatNewUser(req.body);
    return res.redirect("/api/users");
};
const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/api/users");
};
const updateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
    userData = user;
    return res.render("userupdate.ejs", { userData });
};
const hanleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUserInfor(email, username, id);
    return res.redirect("/api/users");
};
module.exports = {
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    updateUserPage,
    hanleUpdateUser,
};

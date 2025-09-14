import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";
// Create the connection to database

const salt = bcrypt.genSaltSync(10);
const handleHashPassword = (userpassword) => {
    let hashPassword = bcrypt.hashSync(userpassword, salt);
    return hashPassword;
};

const creatNewUser = async (data) => {
    let hashPassword = handleHashPassword(data.password);
    let email = data.email;
    let username = data.username;
    try {
        let user = await db.User.create({
            username: username,
            email: email,
            password: hashPassword,
        });
        return user;
    } catch (error) {
        console.log(">>> check error", error);
    }
};

const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;
};

const deleteUser = async (userid) => {
    await db.User.destroy({
        where: {
            id: userid,
        },
    });
    return userid;
};
const getUserById = async (userid) => {
    let user = {};
    user = await db.User.findOne({
        where: {
            id: userid,
        },
    });
    return user.get({ plain: true });
};
const updateUserInfor = async (email, username, id) => {
    await db.User.update(
        {
            email: email,
            username: username,
        },
        {
            where: {
                id: id,
            },
        }
    );
};
module.exports = {
    creatNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor,
};

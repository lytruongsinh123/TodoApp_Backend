
const { Op } = require("sequelize");
import db from "../models/index";
const getCompletedTasks = async () => {
    return await db.Task.findAll({ where: { completed: true } });
};
const getUncompletedTasks = async () => {
    return await db.Task.findAll({ where: { completed: false } });
};
const getAllTasks = async () => {
    return await db.Task.findAll();
};
const getTasksByDate = async (date) => {
    // Giả sử trường ngày là dueDate (hoặc startDate tuỳ DB)
    return await db.Task.findAll({ where: { dueDate: date } });
};
const getTaskById = async (id) => {
    return await db.Task.findByPk(id);
};

const createTask = async (taskData) => {
    return await db.Task.create(taskData);
};

const updateTask = async (id, taskData) => {
    const task = await db.Task.findByPk(id);
    if (!task) return null;
    await task.update(taskData);
    return task;
};

const deleteTask = async (id) => {
    const task = await db.Task.findByPk(id);
    if (!task) return false;
    await task.destroy();
    return true;
};
const getOverdueTasks = async () => {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10); // YYYY-MM-DD
    // Lấy ngày đầu tháng hiện tại
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayStr = firstDay.toISOString().slice(0, 10);
    return await db.Task.findAll({
        where: {
            completed: false,
            dueDate: {
                [Op.lt]: todayStr,
                [Op.gte]: firstDayStr,
            },
        },
    });
}; // Lấy tất cả task theo tháng (dựa vào dueDate)
const getTasksByMonth = async (year, month) => {
    // month: 1-12
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1); // đầu tháng sau
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);
    return await db.Task.findAll({
        where: {
            dueDate: {
                [Op.gte]: startStr,
                [Op.lt]: endStr,
            },
        },
    });
};

// Lấy task chưa hoàn thành, vẫn trong hạn của tháng (dueDate >= hôm nay, complete = false, dueDate trong tháng)
const getUncompletedInTimeByMonth = async (year, month) => {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);
    return await db.Task.findAll({
        where: {
            completed: false,
            dueDate: {
                [Op.gte]: todayStr,
                [Op.gte]: startStr,
                [Op.lt]: endStr,
            },
        },
    });
};

// Lấy danh sách đã hoàn thành theo tháng
const getCompletedTasksByMonth = async (year, month) => {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);
    return await db.Task.findAll({
        where: {
            completed: true,
            dueDate: {
                [Op.gte]: startStr,
                [Op.lt]: endStr,
            },
        },
    });
};
// Lấy task quá hạn trong tháng hiện tại
const getOverdueTasksThisMonth = async () => {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayStr = firstDay.toISOString().slice(0, 10);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastDayStr = lastDay.toISOString().slice(0, 10);
    return await db.Task.findAll({
        where: {
            completed: false,
            dueDate: {
                [Op.lt]: todayStr,
                [Op.gte]: firstDayStr,
                [Op.lte]: lastDayStr,
            },
        },
    });
};
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getCompletedTasks,
    getUncompletedTasks,
    getTasksByDate,
    getOverdueTasks,
    getTasksByMonth,
    getUncompletedInTimeByMonth,
    getCompletedTasksByMonth,
    getOverdueTasksThisMonth,
};

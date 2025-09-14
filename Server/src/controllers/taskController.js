import taskService from "../services/taskService";

// Lấy danh sách tất cả task
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy chi tiết một task
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo task mới
const createTask = async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = await taskService.createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskData = req.body;
        const updatedTask = await taskService.updateTask(id, taskData);
        if (!updatedTask)
            return res.status(404).json({ error: "Task not found" });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await taskService.deleteTask(id);
        if (!deleted) return res.status(404).json({ error: "Task not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy task đã hoàn thành
const getCompletedTasks = async (req, res) => {
    try {
        const tasks = await taskService.getCompletedTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy task chưa hoàn thành
const getUncompletedTasks = async (req, res) => {
    try {
        const tasks = await taskService.getUncompletedTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy task bằng date
const getTasksByDate = async (req, res) => {
    try {
        let { date } = req.query;
        if (!date) return res.status(400).json({ error: "Missing date param" });
        // Nếu date có dạng DD/MM/YYYY thì chuyển sang YYYY-MM-DD
        if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
            const [day, month, year] = date.split("/");
            date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
        const tasks = await taskService.getTasksByDate(date);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy việc làm quá hạn complete = false và dueDate < Ngày hôm nay
const getOverdueTasks = async (req, res) => {
    try {
        const tasks = await taskService.getOverdueTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả task theo tháng
const getTasksByMonth = async (req, res) => {
    try {
        const { year, month } = req.query;
        if (!year || !month)
            return res
                .status(400)
                .json({ error: "Missing year or month param" });
        const tasks = await taskService.getTasksByMonth(
            Number(year),
            Number(month)
        );
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy task chưa hoàn thành, vẫn trong hạn của tháng
const getUncompletedInTimeByMonth = async (req, res) => {
    try {
        const { year, month } = req.query;
        if (!year || !month)
            return res
                .status(400)
                .json({ error: "Missing year or month param" });
        const tasks = await taskService.getUncompletedInTimeByMonth(
            Number(year),
            Number(month)
        );
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy danh sách đã hoàn thành theo tháng
const getCompletedTasksByMonth = async (req, res) => {
    try {
        const { year, month } = req.query;
        if (!year || !month)
            return res
                .status(400)
                .json({ error: "Missing year or month param" });
        const tasks = await taskService.getCompletedTasksByMonth(
            Number(year),
            Number(month)
        );
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Lấy task quá hạn trong tháng hiện tại
const getOverdueTasksThisMonth = async (req, res) => {
    try {
        const tasks = await taskService.getOverdueTasksThisMonth();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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

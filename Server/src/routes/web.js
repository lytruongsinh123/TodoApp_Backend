import express from "express";
import userController from "../controllers/userController";
import taskController from "../controllers/taskController";
import aiController from "../controllers/aiController";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    // USER
    router.get("/users", userController.handleUserPage);
    router.post("/users/create-user", userController.handleCreateNewUser);
    router.post("/users/delete-user/:id", userController.handleDeleteUser);
    router.get("/users/update-user/:id", userController.updateUserPage);
    router.post("/users/update-user", userController.hanleUpdateUser);
    // AI
    router.post("/ai/chat", aiController.chatAi);
    router.post("/ai/general", aiController.chatGeneral);
    // TASK
    router.get("/tasks", taskController.getAllTasks);
    router.get("/tasks/completed", taskController.getCompletedTasks);
    router.get("/tasks/uncompleted", taskController.getUncompletedTasks);
    router.get("/tasks/by-date", taskController.getTasksByDate);
    router.get("/tasks/overdue", taskController.getOverdueTasks);
    router.get("/tasks/by-month", taskController.getTasksByMonth);
    router.get(
        "/tasks/uncompleted-in-time-by-month",
        taskController.getUncompletedInTimeByMonth
    );
    router.get(
        "/tasks/completed-by-month",
        taskController.getCompletedTasksByMonth
    );
    router.get(
        "/tasks/overdue-this-month",
        taskController.getOverdueTasksThisMonth
    );
    router.get("/tasks/:id", taskController.getTaskById);
    router.post("/tasks-create", taskController.createTask);
    router.put("/tasks/:id", taskController.updateTask);
    router.delete("/tasks/:id", taskController.deleteTask);

    app.use("/api", router);
};
export default initWebRoutes;

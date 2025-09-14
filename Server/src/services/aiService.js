import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
import db from "../models";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// Lấy danh sách task từ DB (Postgres/Sequelize)
const getTaskListString = async () => {
    const tasks = await db.Task.findAll();
    return tasks
        .map(
            (t) =>
                `${t.title} (deadline: ${t.dueDate ?? "-"}, priority: ${
                    t.importance ?? "-"
                })`
        )
        .join("\n");
};
// Gọi OpenAI để gợi ý sắp xếp task
const getAiSuggestion = async (userMessage) => {
    const taskList = await getTaskListString();
    const prompt = `Đây là danh sách công việc trong DB:\n${taskList}\n\nNgười dùng nhắn: \"${userMessage}\"\nHãy đưa ra gợi ý hợp lý để sắp xếp và làm việc hiệu quả.`;
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
};
// Chat AI như ChatGPT, nếu user hỏi về task thì gửi kèm danh sách task
const chatGeneral = async (userMessage) => {
    let prompt = userMessage;
    // Nếu user hỏi về task, gợi ý, danh sách, công việc...
    if (
        /task|công việc|todo|danh sách|gợi ý|deadline|ưu tiên/i.test(
            userMessage
        )
    ) {
        const taskList = await getTaskListString();
        prompt = `Đây là danh sách công việc trong DB:\n${taskList}\n\nNgười dùng nhắn: "${userMessage}"`;
    }
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
};
export default {
    getAiSuggestion,
    chatGeneral,
};

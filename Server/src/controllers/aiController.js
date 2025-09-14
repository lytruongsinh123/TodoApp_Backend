// Chat AI như ChatGPT (không context task)
const chatGeneral = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Missing message" });
        const reply = await aiService.chatGeneral(message);
        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with AI" });
    }
};
import aiService from "../services/aiService";

// Controller cho AI chat suggestion
const chatAi = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Missing message" });
        const reply = await aiService.getAiSuggestion(message);
        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with AI" });
    }
};

export default {
    chatAi,
    chatGeneral,
};

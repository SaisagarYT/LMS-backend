const Chat = require('../models/chatgpt.model');
const {GoogleGenAI} = require('@google/genai');

const chatDetails = async(req,res) =>{
    const {title} = req.body;
    try{

        const ai = new GoogleGenAI({apiKey: process.env.GEMINIAPI});
    
        async function main() {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: title,
        });
        console.log(response.text);
        if(response.text){
            const newChat = new Chat({
                title:title,
                description:response.text
            });
            await newChat.save();
            return res.status(200).json(newChat);
        }
        }
        main();
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
}

const chatHistory = async(req,res) =>{
    try{
        const chats = await Chat.find();
        if(chats.length != 0){
            return res.status(200).json(chats);
        }
        return res.status(400).json({message:"No chats found in DB"});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports = {chatDetails,chatHistory};
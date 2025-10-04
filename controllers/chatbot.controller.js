const {GoogleGenAI} = require('@google/genai');
const Message = require('../models/message.model');
const Conversation = require('../models/converstaion.model');

const ai = new GoogleGenAI({apiKey:process.env.GEMINIAPI});

const messageChatbot = async (req, res) => {
    const message = req.body;
    const id = req.params.id;
   if(id === "new"){

    const conversationId = new Conversation();
    conversationId.save();

    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents: message.content || "who is president of america?"
    });

    const userModel = new Message({
        conversation:conversationId,
        role:"user",
        content:message.content,
    })
    userModel.save();
    
    const assistentModel = new Message({
        conversation:conversationId,
        role:"assitent",
        content:response.text,
    });
    assistentModel.save();
    return res.status(200).json([userModel,assistentModel]);
   }
   else{
    const conversationId = await Conversation.findById(id);
    if(!conversationId){
        return res.status(400).json({message:"No id found in the db"});
    }
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents: message.content || "who is president of america?"
    });

    const userModel = new Message({
        conversation:conversationId,
        role:"user",
        content:message.content,
    })
    userModel.save();
    
    const assistentModel = new Message({
        conversation:conversationId,
        role:"assitent",
        content:response.text,
    });
    assistentModel.save();
    const conversations = await Message.find({conversation:conversationId});
    return res.status(200).json(conversations);
   }
};

const getMessageById = async(req,res) =>{
    const id = req.params.id;
    try{
        const response = await Message.find({conversation:id});
        if(!response){
            return res.status(400).json({message:"No response was found"});
        }
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}

const getConversationMessages = async(req,res) =>{
    try{
        const conversation = await Conversation.find();
        if(!conversation){
            return res.status(400).json({message:"No conversation was found"});
        }
        return res.status(200).json(conversation);
    }
    catch(err){
        return res.status(500).json({err:err.message});
    }
}

module.exports = { messageChatbot, getMessageById, getConversationMessages};

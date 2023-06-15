const router = require("express").Router();
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const {getAllChatrooms, getMessagesByChatroom,createChatroom, deleteChatroom,addMessage,getMessages} = require("../controllers/chatroomController");

router.get("/get-all-chatrooms", getAccessToRoute,getAllChatrooms);
router.get("/getMessages/:id", getAccessToRoute, getMessagesByChatroom);
router.post("/create-chatroom",getAccessToRoute,createChatroom);
router.delete("/delete-chatroom/:id",getAccessToRoute,deleteChatroom);
router.post("/add-msg/", addMessage);
router.post("/get-msg/", getMessages);

module.exports = router;
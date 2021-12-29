const crypto = require("crypto");

// Import a mock user Model
const UsersModule = require("./users");

// Set this secret in the .env file for use with identity verification, see:
// https://talkjs.com/docs/Features/Identity_Verification.html
const secret = process.env.SECRET;

exports.index = (req, res) => {
    // Mock DB calls to find the current user and the person they wish to chat with
    const me = UsersModule.findOne(req.query.me);
    const other = UsersModule.findOne(req.query.other);

    // If both the users can be found, render the view and pass in the user information
    if (me && other) {
        return res.render("chat", {
            me: me,
            other: other,
            signature: crypto.createHmac("sha256", secret).update(me.id).digest("hex")
        })
    }

    res.send("No users found!");
}

exports.dual = (req, res) => {
    const chatMember1 = UsersModule.findOne({username});
    const chatMember2 = UsersModule.findOne({username});
    

    res.render("dual-chat", {
        // chatMember1 will be the 'left' side chat window
        chatMember1: chatMember1,
        chatMember1Sig: crypto.createHmac("sha256", secret).update(chatMember1.id).digest("hex"),

        // chatMember2 will be the 'right' side chat window
        chatMember2: chatMember2,
        chatMember2Sig: crypto.createHmac("sha256", secret).update(chatMember2.id).digest("hex"),
        // Marco will a be a member of the group conversation
        // marco: marco,
        // Generate a unique conversation ID for the group chat by using the user's IDs alphabetically sorted (by name)
        // see: https://talkjs.com/docs/Reference/Concepts/Conversations.html
        convId: chatMember2.id + marco.id + chatMember1.id
    })
}
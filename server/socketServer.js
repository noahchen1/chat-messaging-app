const User = require('./model/User');
const io = require('socket.io')(5000, {
    cors: {
        origin: ['http://localhost:3000']
    }
});




io.on('connection', async socket => {
    console.log('a user connected')

    const id = socket.handshake.query.id
    socket.join(id)

    console.log(await User.findOne({username: 'Noah' }).exec())
    socket.on('send-message', ({ recipients, text }) => {



        // recipients.map(recipient => {
        //     console.log(recipient)
        //     const foundRecipient = User.findOne({ username: recipient }).exec();

        //     console.log(foundRecipient)
        // })


        // recipients.forEach(recipient => {
        //     const newRecipients = recipients.filter(r => r !== recipient);

        //     newRecipients.push(id)
        //     socket.broadcast.to(recipient).emit('receive-message', {
        //         recipients: newRecipients, sender: id, text
        //     })
        // })
    })
})



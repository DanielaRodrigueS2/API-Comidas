require('dotenv').config();
const app = require('./app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log('Server ligou :3 na porta: ', PORT)
})
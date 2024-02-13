const express = require('express');
require('./DB/connect');
const userRoutes = require('./Routes/UserRoutes');



const port = 4040;
const app = express();
app.use(express.json());


app.use("/user", userRoutes);

app.use('/', (req, res) => {
    res.send("HELLO")
})


app.listen(port, () => {
    console.log(`connetion is setup at ${port}`);
});
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aalokyadav:12345@cluster0.xg88yai.mongodb.net/hostel-management?retryWrites=true&w=majority",
    {
        //   useCreateIndex:true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => {
        console.log("DB connection successful");
    })
    .catch((error) => {
        console.log("somthing wrong", error);
    });
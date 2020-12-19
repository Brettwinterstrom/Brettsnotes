const express = require("express");
app = express();

const PORT = process.env.PORT || 3000;


app.listen(PORT, function () {
    console.log(`Listening on PORT: ${PORT}`);
});
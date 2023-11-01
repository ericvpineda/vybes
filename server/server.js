const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())


// Test route
app.get('/message', (req, res) => {
    res.json({message: "Hello from server!"})
})

const port = 8000
app.listen(port, () => console.log(`Server is running on port ${port}.`))
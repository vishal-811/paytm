const express =require("express");
const app=express();
const cors =require('cors');
app.use(cors());
app.use(express.json());

const rootRouter = require('./routes/index')
app.use('/api/v1',rootRouter);

app.listen(3000);
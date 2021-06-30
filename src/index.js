const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

//app.use(cors({
//    origin: "http://site.com.br";
//}));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(80);
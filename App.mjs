import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import main from './main.mjs';

main();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/api-users', (req, res) => {
    const lastname = req.body.lastname
    res.send('Ok, ' + lastname)
})

const port = 3000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log('The server is running on port ' + port);
});

console.log(__dirname);

export default app;

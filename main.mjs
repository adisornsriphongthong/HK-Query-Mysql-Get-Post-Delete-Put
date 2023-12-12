import mysql from 'mysql2'
import app from './App.mjs';

const connection = mysql.createConnection({
    host: '127.0.0.1',     // Use the server's IP address or 'localhost'
    user: 'root',          // MySQL username
    database: 'pim_database',      // Your MySQL database name
    charset: 'utf8mb4'     // Set the character set as needed
});

const main = async () => {
    try {
        connection.connect((err) => {
            if(err) throw err;
            console.log('Connected to database.')
        })

        connection.query('SELECT * FROM students', async (err, data) => {
            //const result = await data.find(e => e.id == '1')
            //console.log(result)

            app.get('/query-1', (req, res) => {
                res.json(data)
            })
            
            app.get('/query-2', (req, res) => {
                const result = data.find(e => e.id == 1);
                res.json(result)
            })

            app.delete('/query-3/:id', (req, res) => {
                const id = req.params.id;
                const result = data.find(e => e.id == id)

                connection.query('DELETE FROM students WHERE id = ?;', id)
                res.json(result)
            })

            app.post("/query-4", (req, res) => {
                const result = {
                    id: req.body.id,
                    name: req.body.name,
                    age: req.body.age,
                    phone: req.body.phone,
                    email: req.body.email,
                }
                
                connection.query(`
                INSERT INTO students (id, name, age, phone, email)
                VALUES (${parseInt(result.id)}, '${result.name}', ${parseInt(result.age)}, '${result.phone}', '${result.email}');`)
                res.json(result) 
            })

            app.put('/query-5', (req, res) => {
                const result = {
                    id: req.body.id,
                    name: req.body.name,
                    age: req.body.age,
                    phone: req.body.phone,
                    email: req.body.email,
                }
                
                connection.query(`
                UPDATE students 
                SET id = ${parseInt(result.id)}, name = '${result.name}', age = ${parseInt(result.age)}, phone = '${result.phone}', email = '${result.email}'
                WHERE id = ${parseInt(result.id)};`)

                res.send(result)
            })
        })
    } catch (error) {
        
    }
}

export default main
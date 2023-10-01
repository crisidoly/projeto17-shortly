import db from "../database/databaseConnection.js"
import bcrypt from 'bcrypt';

export async function postSignUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(422).send({ message: 'As senhas devem ser iguais!' });
    }

    try {
        const existingUser = await db.query('SELECT email FROM users WHERE email = $1', [email]);

        if (existingUser.rowCount > 0) {
            return res.status(409).send('E-mail já cadastrado.');
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const newUser = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, passwordHash]);

        res.status(201).send(newUser.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


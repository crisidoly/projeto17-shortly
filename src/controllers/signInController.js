import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function postSignIn(req, res) {
    const { email, password } = req.body;
    const token = uuidv4();

    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (!user.rowCount) {
            return res.status(401).send('Usuário não existe.');
        }

        const hashedPassword = user.rows[0].password;

        if (!bcrypt.compareSync(password, hashedPassword)) {
            return res.status(401).send('Senha ou email incorretos.');
        }

        await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [user.rows[0].id, token]);

        res.status(200).send({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

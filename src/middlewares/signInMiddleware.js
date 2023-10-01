import { signInSchemaValidation } from "../models/signin.js"
import { db } from "../database/databaseConnection.js";
import bcrypt from "bcrypt"

export async function signInValidation(req, res, next) {
    const signInBody = req.body;

    const { error } = signInSchemaValidation.validate(signInBody, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(422).send(`There is a body validation problem: ${errors}`)
    }

    const signInbodyValidated = await db.query("SELECT users.email, users.password, users.id FROM users WHERE email = $1", [signInBody.email])
    
    if (signInbodyValidated.rowCount === 0) {
        return res.status(401).send("email or password incorrect");
    }

    const validatePassword = bcrypt.compareSync(signInBody.password.toString(), signInbodyValidated.rows[0].password)

    if (!validatePassword) {
        return res.status(401).send("email or password incorrect");
    }

    res.locals.signInbodyValidated = signInbodyValidated.rows[0];

    next();    
}
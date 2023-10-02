import db from "../database/databaseConnection.js";
import { urlSchema } from "../schemas/appSchema.js"

export async function tokenValidation(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).send("Missing or invalid token format");
    }

    const token = authorization.replace("Bearer ", "");

    try {
        const userObj = await db.query(`SELECT sessions."userId" FROM sessions WHERE token = $1`, [token]);

        if (userObj.rowCount === 0) {
            return res.status(401).send("Token Authentication failed");
        }

        res.locals.userId = userObj.rows[0].userId;
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}


export function UrlBodyValidation(req, res, next) {
    const url = req.body;

    const { error } = urlSchema.validate(url, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(`There is a body validation problem: ${errors}`);
    }

    res.locals.url = url;
    next();
}

export async function filterUserIdUrls(req, res, next) {
    try {
        const urlsObjById = await db.query(`SELECT * FROM urls WHERE "id" = $1`, [req.params.id]);

        if (urlsObjById.rowCount === 0) {
            return res.status(404).send("Url not found");
        }

        if (urlsObjById.rows[0].userId !== res.locals.userId) {
            return res.status(401).send("The URL does not belong to the user");
        }

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}

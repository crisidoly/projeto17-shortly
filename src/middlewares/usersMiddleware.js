import db from "../database/databaseConnection.js";

export async function tokenValidation(req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization ? authorization.replace("Bearer ", "") : undefined;

        if (!token) {
            return res.status(401).send("Missing token");
        }

        const userObj = await db.query(`SELECT sessions."userId" FROM sessions WHERE token = $1`, [token]);

        if (userObj.rowCount === 0) {
            return res.status(404).send("Token Authentication failed: User not Found");
        }

        res.locals.userId = userObj.rows[0].userId;
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}

import db from "../database/databaseConnection.js";

export async function getUser(req, res) {
    try {
        const userId = res.locals.userId;

        const [userQueryResult, urlsQueryResult] = await Promise.all([
            db.query(`SELECT users.id, users.name FROM users WHERE id = $1`, [userId]),
            db.query(`SELECT id, "shortUrl", url, visits FROM urls WHERE "userId" = $1`, [userId])
        ]);

        const user = userQueryResult.rows[0];
        const urls = urlsQueryResult.rows;

        const visitCount = urls.reduce((count, obj) => count + obj.visits, 0);

        const getObj = {
            id: user.id,
            name: user.name,
            visitCount,
            shortenedUrls: urls
        };

        res.send([getObj]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

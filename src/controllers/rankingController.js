import db from "../database/databaseConnection.js";

export async function rankingUrls(req, res) {
    try {
        const query = `
            SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", COALESCE(SUM(urls.visits), 0) AS "visitCount"
            FROM users
            LEFT JOIN urls ON users.id = urls."userId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `;

        const ranking = await db.query(query);
        
        const rankingFormat = ranking.rows.map(obj => ({
            id: obj.id,
            name: obj.name,
            linksCount: obj.linksCount,
            visitCount: obj.visitCount || 0 // Default to 0 if visitCount is null
        }));

        res.status(200).send(rankingFormat);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

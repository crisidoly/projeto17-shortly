import { nanoid } from "nanoid";
import { v4 as uuidv4 } from 'uuid';
import db from "../database/databaseConnection.js";

export async function deleteUrl(req, res) {
    try {
        const urlId = req.params.id;
        await db.query(`DELETE FROM urls WHERE id = $1`, [urlId]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function urlShortenController(req, res) {
    const userId = res.locals.userId;
    const originalUrl = res.locals.url;
    const shortUrl = uuidv4();

    try {
        const result = await db.query(
            `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3) RETURNING id`,
            [userId, originalUrl, shortUrl]
        );

        const newUrlId = result.rows[0].id;

        res.status(201).send({ id: newUrlId, shortUrl });
    } catch (err) {
        res.status(500).send(err.message);
    }
}




export async function redirectUser(req, res) {
    const shortUrl = req.params.shortUrl;
    
    try {
        const urlToDirect = await db.query(
            `SELECT url, visits FROM urls WHERE "shortUrl" = $1`,
            [shortUrl]
        );

        if (urlToDirect.rowCount === 0) {
            return res.sendStatus(404);
        }

        const updatedVisits = urlToDirect.rows[0].visits + 1;

        try {
            await db.query(
                `UPDATE urls SET visits = $2 WHERE "shortUrl" = $1`,
                [shortUrl, updatedVisits]
            );
        } catch (err) {
            return res.status(500).send(err.message);
        }

        const originalUrl = urlToDirect.rows[0].url;
        return res.redirect(302, originalUrl);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getUrlbyId(req, res) {
    try {
        const userId = req.params.id;
        const queryResult = await db.query(
            `SELECT id, url, "shortUrl" FROM urls WHERE "userId" = $1`,
            [userId]
        );

        const urls = queryResult.rows;

        if (urls.length === 0) {
            return res.status(404).send("No URLs found for the respective user id");
        }

        return res.status(200).json(urls);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}



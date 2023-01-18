import express from 'express';
import http, { IncomingMessage } from "http";
import https from "https";

export let router = express.Router();

router.route('/:target').get(proxy_request);

function proxy_request(req: any, res: any) {
    const feedUrlString = Buffer.from(req.params.target, 'base64').toString('utf8');
    const feedUrl = new URL(feedUrlString)

    const client = (feedUrl.protocol == "https:") ? https : http; 
    client.get(feedUrl, {}, (feedRes: IncomingMessage) => {
        res.status(feedRes.statusCode);
        res.set(feedRes.headers);

        feedRes.on('data', chunk => res.write(chunk));
        feedRes.on('end', () => res.end());
    });
}
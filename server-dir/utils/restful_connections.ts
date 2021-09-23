/***
 * restful_connections.ts = rest api file:
 * every restful connection function to the
 * client using express restful api.
 */

import express from 'express';

async function loadHtml(router: express.Router, html: string) {
    router.get('/', (req, res) => {
        res.send(html);
      });

}

export {loadHtml}; 
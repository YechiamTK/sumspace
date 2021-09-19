import express from 'express';

async function loadHtml(router: express.Router, html: string) {
    router.get('/', (req, res) => {
        res.send(html);
      });
    
}

export {loadHtml};
/***
 * restful_connections.ts = rest api file:
 * every restful connection function to the
 * client using express restful api.
 */

import express from 'express';


/**
 * util function loadFile:
 * 
 * loads up a file onto a given route. 
 * @param router express router to be used
 * @param route route to send the file to
 * @param file file to send
 */
async function loadFile(router: express.Router, route: string, file: string) {
    router.get(route, (req, res) => {
        res.sendFile(file);
      });

}

export {loadFile}; 
/***
 * util.ts = utility methods/apis 
 */



import { Router } from "express";



/**
 * util function loadFile:
 * 
 * loads up a file onto a given route. 
 * @param router express router to be used
 * @param route route to send the file to
 * @param file file to send
 */
 export async function loadFile(router: Router, route: string, file: string) {
    router.get(route, (req, res) => {
        res.sendFile(file);
      });
 
}
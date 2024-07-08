// 1
// This file starts the server, configurate it with its proper port and hostname (if needed), and
// catches any possible error into a try-catch block inside the startServer function

import app from "./src/server";
import config from "./src/config"
import logger from "./src/logger";

const startServer = () => {
    try {
        const URL = `${config.host}:${config.port}`
        app.listen(config.port, () => {
            console.log(`Server is running at http://${URL}`)
        }); 
    }  catch(err) {
        logger.error(err)
    }
}

startServer();
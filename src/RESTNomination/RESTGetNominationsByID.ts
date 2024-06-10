import chalk from "chalk";
import express from "express"
import { DBConnectionInstance } from "../DBConnectionSingleton.js";
import { RESTSendError } from "../utils/RESTSendError.js";

export const RESTGetNominationsByID = async (req: express.Request<{nominationId: number}>, res: express.Response) => {

  console.log(chalk.cyan(`Getting Nomination: ${req.params.nominationId}`))

  if (!req.params.nominationId) {

    RESTSendError(res, 400, "No nominationId was provided in Path Parameter")

    console.log(chalk.red(`Getting Nomination Failed No nominationId`))
    
    return
  }

  if ( isNaN(req.params.nominationId)) {

    RESTSendError(res, 400, "nominationId was provided but is not a number")

    console.log(chalk.red(`Getting Nomination Failed: nominationId is not a number`))
    
    return
  }

  console.log(chalk.green("  Connecting to DB"))

  const DBConInst = await DBConnectionInstance();

  console.log(chalk.green("  Executing Query"))

  const DBRes = await DBConInst.query(`
    SELECT 
      * 
    FROM tblNominations
    WHERE nominationId = ${req.params.nominationId}
  `)

  console.log(chalk.green("  Sending Response"))

  res.send(DBRes.recordset)

  console.log(chalk.cyan(`Done Getting Nomination: ${req.params.nominationId}`))
}
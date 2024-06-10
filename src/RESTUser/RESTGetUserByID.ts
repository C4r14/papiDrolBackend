import chalk from "chalk";
import express from "express"
import { DBConnectionInstance } from "../DBConnectionSingleton.js";
import { RESTSendError } from "../utils/RESTSendError.js";

export const RESTGetUserByID = async (req:express.Request<{userId: number}>, res: express.Response) => {
  
  console.log(chalk.cyan(`Getting User: ${req.params.userId}`))

  if (!req.params.userId) {

    RESTSendError(res, 400, "No userId was provided in Path Parameter")

    console.log(chalk.red(`Getting User Failed No UserId`))
    
    return
  }

  if ( isNaN(req.params.userId)) {

    RESTSendError(res, 400, "userId was provided but is not a number")

    console.log(chalk.red(`Getting User Failed: userId is not a number`))
    
    return
  }

  console.log(chalk.green("  Connecting to DB"))

  const DBConInst = await DBConnectionInstance();

  console.log(chalk.green("  Executing Query"))

  const DBRes = await DBConInst.query(`
    SELECT 
      * 
    FROM tblUsers
    WHERE userId = ${req.params.userId}
  `)

  console.log(chalk.green("  Sending Response"))

  res.send(DBRes.recordset)

  console.log(chalk.cyan(`Done Getting User: ${req.params.userId} count: ${DBRes.recordset.length}`))
}
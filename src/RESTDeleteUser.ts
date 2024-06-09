import chalk from "chalk";
import express from "express"
import { DBConnectionInstance } from "./DBConnectionSingleton.js";

export const RESTDeleteUser = async (req:express.Request<{userId: string}> , res: express.Response) => {
  console.log(chalk.cyan(`Deleting User: ${req.params.userId}`))

  console.log(chalk.green("  Connecting to DB"))
  const DBConInst = await DBConnectionInstance();
  console.log(chalk.green("  Executing Query"))

  const DBRes = await DBConInst.query(`
    DELETE
    FROM tblUsers
    WHERE userId = ${req.params.userId}
  `)

  console.log(chalk.green("  Sending Response"))

  res.send(DBRes.recordset)
  console.log(chalk.cyan(`Done Deleting UserId: ${req.params.userId}`))
}
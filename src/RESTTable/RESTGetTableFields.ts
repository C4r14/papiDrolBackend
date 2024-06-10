import chalk from "chalk";
import express from "express"
import { DBConnectionInstance } from "../DBConnectionSingleton.js";

export const RESTGetTableFields = async (req: express.Request<{ table: string}>, res: express.Response) => {

  console.log(chalk.cyan(`Getting Fields: ${req.params.table}`))

  console.log(chalk.green("  Connecting to DB"))

  const DBConInst = await DBConnectionInstance();

  console.log(chalk.green("  Executing Query"))

  const DBRes = await DBConInst.query(`
    SELECT 
      *
    FROM 
      INFORMATION_SCHEMA.COLUMNS
    WHERE 
      TABLE_NAME = '${req.params.table}'
  `)

  console.log(chalk.green("  Sending Response"))

  res.send(DBRes.recordset)

  console.log(chalk.cyan(`Done Getting Fields: ${req.params.table}`))
}
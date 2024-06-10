import chalk from "chalk";
import express from "express"
import { DBConnectionInstance } from "../DBConnectionSingleton.js";

export const RESTGetTables = async (req: express.Request,res: express.Response) => {

  console.log(chalk.cyan(`Getting Tables`))

  console.log(chalk.green("  Connecting to DB"))

  const DBConInst = await DBConnectionInstance();

  console.log(chalk.green("  Executing Query"))

  const DBRes = await DBConInst.query(`
    SELECT 
      * 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_TYPE='BASE TABLE'
  `)

  console.log(chalk.green("  Sending Response"))

  res.send(DBRes.recordset)
  console.log(chalk.cyan("Done Getting Tables"))
}
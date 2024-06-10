import chalk from "chalk";
import express from "express"
import { DBConnectionInstance } from "../DBConnectionSingleton.js";

export const RESTPostUser = async (req: TypedRequest<RestServer.UserInsertData>, res: express.Response) => {
  
  console.log(chalk.cyan(`Inserting User`))

  const UserInfo = req.body;

  if (!UserInfo){

    res.status(400);
    res.send(JSON.stringify({
      message:"No Body was found on POST request for /User"
    }))

    return;
  }

  if (
    !UserInfo.firstName  ||
    !(typeof UserInfo.firstName === "string")
  ) {

    res.status(400);
    res.send(JSON.stringify({
      message:"firstName is Missing on Body on POST request for /User"
    }))

    console.log(chalk.red("Bad Request missing: firstName on POST /User"))

    return;
  }
  
  if (
    !UserInfo.lastName ||
    !(typeof UserInfo.lastName === "string")
  ) {

    res.status(400);
    res.send(JSON.stringify({
      message:"lastName is Missing on Body on POST request for /User"
    }))

    console.log(chalk.red("Bad Request missing: lastName on POST /User"))

    return;
  }

  console.log(chalk.green("  Connecting to DB"))

  const DBConInst = await DBConnectionInstance();

  console.log(chalk.green("  Executing Query"))

  let Query = `
    INSERT INTO tblUsers (firstname,lastname)
    VALUES ('${UserInfo.firstName}','${UserInfo.lastName}')
  `

  await DBConInst.query(Query)
  
  Query = `
    SELECT
      *
    FROM 
      tblUsers
    WHERE 
      (firstname = '${UserInfo.firstName}' )
    AND 
      (lastname = '${UserInfo.lastName}')
  `
  
  const DBRes = await DBConInst.query(Query)
  
  console.log(chalk.green("  Sending Response"))

  res.send(DBRes.recordset)

  console.log(chalk.cyan(`Done Inserting User: Count ${DBRes.recordset.length}`))
}
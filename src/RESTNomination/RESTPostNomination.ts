import chalk from "chalk";
import express from "express"
import { DBConnectionInstance } from "../DBConnectionSingleton.js";
import { RESTSendError } from "../utils/RESTSendError.js";

export const RESTPostNomination = async (req: TypedRequest<RestServer.NominationInsertData>, res: express.Response) => {

  console.log(chalk.cyan(`Posting Nomination`))

  if (!req.body.userId) {

    RESTSendError(res, 400, "No userId was provided in the body")

    console.log(chalk.red(`Posting Nomination Failed: No userId was Provided in body`))
    
    return
  }

  if (!req.body.month) {

    RESTSendError(res, 400, "No month was provided in the body")

    console.log(chalk.red(`Posting Nomination Failed: No month was Provided in body`))
    
    return
  }

  if (!req.body.nominationType) {

    RESTSendError(res, 400, "No nominationType was provided in the body")

    console.log(chalk.red(`Posting Nomination Failed: No nominationType was Provided in body`))
    
    return
  }

  if (!req.body.description) {

    RESTSendError(res, 400, "No description was provided in the body")

    console.log(chalk.red(`Posting Nomination Failed: No description was Provided in body`))
    
    return
  }

  if ( isNaN(req.body.userId)) {

    RESTSendError(res, 400, "userId was provided in the body but is not a number")

    console.log(chalk.red(`Posting Nomination Failed: userId was Provided in body but is not a number`))
    
    return
  }

  if ( req.body.nominationType !== "Papi" && req.body.nominationType !== "Drol" ) {

    RESTSendError(res, 400, "nominationType was provided in the body but is not 'Papi' or 'Drol'")

    console.log(chalk.red(`Posting Nomination Failed: nominationType was Provided in body but is not not 'Papi' or 'Drol'`))
    
    return
  }
  
  //ToDo add Month Validation

  console.log(chalk.green("  Connecting to DB"))

  const DBConInst = await DBConnectionInstance();

  console.log(chalk.green("  Executing Query"))

  let Query = `
    INSERT INTO tblNominations (userId, month, nominationType, description)
    VALUES (${req.body.userId}, '${req.body.month}', '${req.body.nominationType}', '${req.body.description}')
  `

  await DBConInst.query(Query)

  console.log(chalk.green("  Inserted Successfully"))

  Query = `
    SELECT 
      * 
    FROM 
      tblNominations
    WHERE 
      (userId = ${req.body.userId})
    AND
      (month = '${req.body.month}')
    AND
      (nominationType = '${req.body.nominationType}')
    AND
      (description LIKE '${req.body.description}')
  `

  const DBRes = await DBConInst.query(Query)
  
  console.log(chalk.green("  Getting Nomination that was inserted"))

  res.send(DBRes.recordset)

  console.log(chalk.cyan(`Done Getting Nominations: Count ${DBRes.recordset.length}`))
}
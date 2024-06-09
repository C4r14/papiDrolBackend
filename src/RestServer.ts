import express from "express"
import cors from "cors"
import chalk from "chalk";
import { DBConnectionInstance } from "./DBConnectionSingleton.js";
import { RESTDeleteUser } from "./RESTDeleteUser.js";

const Server = express();

const ServerPort = 4200;

Server.use(cors({
  origin: "*",
  allowedHeaders: "*",
  methods: "*"
}))

Server.use(express.json());

Server.get("/Users", async (req, res) => {

  console.log(chalk.cyan("Getting Users:"))

  console.log(chalk.green("  Connecting to DB"))
  const DBConInst = await DBConnectionInstance();
  console.log(chalk.green("  Executing Query"))

  const DBRes = await DBConInst.query(`
    SELECT 
      * 
    FROM tblUsers
  `)

  console.log(chalk.green("  Sending Response"))

  res.send(DBRes.recordset)
  console.log(chalk.cyan("Done Getting Users"))

})

Server.get('/User/:UserId', async (req, res) => {
  console.log(chalk.cyan(`Getting User: ${req.params.UserId}`))

  console.log(chalk.green("  Connecting to DB"))

  const DBConInst = await DBConnectionInstance();

  console.log(chalk.green("  Executing Query"))

  const DBRes = await DBConInst.query(`
    SELECT 
      * 
    FROM tblUsers
    WHERE userId = ${req.params.UserId}
  `)

  console.log(chalk.green("  Sending Response"))

  res.send(DBRes.recordset)
  console.log(chalk.cyan(`Done Getting User: ${req.params.UserId}`))
}) 

Server.get('/tables', async (req,res) => {

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
})

Server.get('/nominations', async (req,res) => {

  console.log(chalk.cyan(`Getting Nominations`))

  console.log(chalk.green("  Connecting to DB"))

  const DBConInst = await DBConnectionInstance();

  console.log(chalk.green("  Executing Query"))

  const DBRes = await DBConInst.query(`
    SELECT 
      * 
    FROM tblNominations
  `)

  console.log(chalk.green("  Sending Response"))

  res.send(DBRes.recordset)

  console.log(chalk.cyan("Done Getting Nominations"))
})

Server.get('/nomination/:nominationId', async (req,res) => {

  console.log(chalk.cyan(`Getting Nomination: ${req.params.nominationId}`))

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
})

Server.get('/votes', async (req,res) => {

  console.log(chalk.cyan(`Getting Votes`))

  console.log(chalk.green("  Connecting to DB"))

  const DBConInst = await DBConnectionInstance();

  console.log(chalk.green("  Executing Query"))

  const DBRes = await DBConInst.query(`
    SELECT 
      * 
    FROM tblVotes
  `)

  console.log(chalk.green("  Sending Response"))

  res.send(DBRes.recordset)

  console.log(chalk.cyan(`Done Getting Votes`))
})

Server.get('/tableFields/:table', async (req,res) => {

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
})

Server.post("/User",async (req: TypedRequest<RestServer.UserInsertData>, res) => {
  
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

  console.log(Query)

  await DBConInst.query(Query)

  console.log(chalk.green("  Sending Response"))

  Query = `
    SELECT
      *
    FROM tblUsers
    WHERE 
      (firstname = '${UserInfo.firstName}' )
    AND 
      (lastname = '${UserInfo.lastName}')
  `

  console.log(Query)

  const DBRes = await DBConInst.query(Query)

  res.send(DBRes.recordset)

  console.log(chalk.cyan(`Done Inserting User`))
} )

Server.delete('/User/:userId', (req,res) => {

  RESTDeleteUser(req,res);
})

Server.listen(ServerPort, ()=>{

  console.log(`server Listening on http://localhost:${ServerPort}`)
})
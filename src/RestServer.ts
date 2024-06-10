import express from "express"
import cors from "cors"

import { RESTDeleteUser } from "./RESTUser/RESTDeleteUser.js";
import { RESTGetUsers } from "./RESTUser/RESTGetUsers.js";
import { RESTPostUser } from "./RESTUser/RESTPostUser.js";
import { RESTGetUserByID } from "./RESTUser/RESTGetUserByID.js";
import { RESTGetTables } from "./RESTTable/RESTGetTables.js";
import { RESTGetNominations } from "./RESTNomination/RESTGetNominations.js";
import { RESTGetVotes } from "./RESTVote/RESTGetVotes.js";
import { RESTGetTableFields } from "./RESTTable/RESTGetTableFields.js";
import { RESTGetNominationsByID } from "./RESTNomination/RESTGetNominationsByID.js";
import { RESTPostNomination } from "./RESTNomination/RESTPostNomination.js";

const Server = express();

const ServerPort = 4200;

Server.use(cors({
  origin: "*",
  allowedHeaders: "*",
  methods: "*"
}))

Server.use(express.json());

////////////////////////////////////////////////////////////////////////////////
//                           User REST
////////////////////////////////////////////////////////////////////////////////

Server.get("/users", RESTGetUsers)

Server.get('/user/:userId', RESTGetUserByID) 

Server.post("/user", RESTPostUser )

Server.delete('/user/:userId', RESTDeleteUser)

////////////////////////////////////////////////////////////////////////////////
//                           Table REST
////////////////////////////////////////////////////////////////////////////////

Server.get('/tables', RESTGetTables)

Server.get('/tableFields/:table', RESTGetTableFields)

////////////////////////////////////////////////////////////////////////////////
//                           Nomination REST
////////////////////////////////////////////////////////////////////////////////

Server.get('/nominations', RESTGetNominations)

Server.get('/nomination/:nominationId', RESTGetNominationsByID )

Server.post('/nomination', RESTPostNomination )

////////////////////////////////////////////////////////////////////////////////
//                           Vote REST
////////////////////////////////////////////////////////////////////////////////

Server.get('/votes', RESTGetVotes)

Server.listen(ServerPort, ()=>{

  console.log(`server Listening on http://localhost:${ServerPort}`)
})
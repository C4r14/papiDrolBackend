import chalk from "chalk";
import sql from "mssql"

import * as dotenv from 'dotenv';
dotenv.config({
  path:"../.env"
});

let ConnectionInstance: sql.ConnectionPool | undefined;

const OrangeChalk = chalk.hex("#FFA500")

console.log(process.env.DB_SERVER)

export async function DBConnectionInstance(): Promise<sql.ConnectionPool> {

  if (ConnectionInstance){

    return ConnectionInstance;
  }

  ConnectionInstance = await sql.connect(`
    Server=${process.env.DB_SERVER};
    Initial Catalog=${process.env.DB_NAME};
    Persist Security Info=False;
    User ID=${process.env.DB_USER};
    Password={${process.env.DB_PASSWORD}};
    MultipleActiveResultSets=False;
    Encrypt=True;
    TrustServerCertificate=False;
    Connection Timeout=30;
  `);

  return ConnectionInstance;
}

export function CloseDBConnection(){

  if (ConnectionInstance){

    try {
      
      if (ConnectionInstance.connected){

        ConnectionInstance.close();

        console.log(OrangeChalk("Connection Closed Successfully"))

        return true;
      }
      else{

        console.log(OrangeChalk("Connection Already Closed"))

        return false;
      }

    } catch (error) {
      
      console.log(chalk.red("Error Encountered while Closing DB Connection"))

      return false;
    }
  }

  console.log(chalk.red("No Connection Instance to Close"))

  return false;
}
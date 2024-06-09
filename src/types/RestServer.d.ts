declare namespace RestServer {

  type UserInsertData = {
    firstName: string,
    lastName: string
  }

  type UserData = UserInsertData & {
    userId: number
  }
}
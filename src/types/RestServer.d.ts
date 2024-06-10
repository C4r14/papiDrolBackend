declare namespace RestServer {

  type UserInsertData = {
    firstName: string,
    lastName: string
  }

  type UserData = UserInsertData & {
    userId: number
  }

  type NominationInsertData = {
    userId: number,
    month: string,
    nominationType: 'Papi' | 'Drol',
    description: string
  }
}
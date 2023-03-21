export interface Player{

  id?: number
  username?: string
  email: string
  password?: string
  created_on?: Date
}


export interface PlayerToSend{
  id?: number
  username?: string
  email?: string
  password?: string
}

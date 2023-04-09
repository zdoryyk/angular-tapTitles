export interface Player{

  id?: number
  username?: string
  email: string
  password?: string
  created_on?: Date
  isAdmin?: boolean
  photoUrl?: string
}


export interface PlayerToSend{
  id?: number
  username?: string
  email?: string
  password?: string
}

export interface Score{
  score_id: number
  user_id: number
  points: number
  playedOn: Date
}

export interface ScoreToSend{
  user_id: number
  points: number
}

export interface Rating{
  rating_id: number
  user_id: number
  rating: number
  ratedOn: Date
}

export interface Comment{
  comment_id: number
  user_id: number
  comment: string
  commentedOn: Date
}

export interface Tile {
  value: string
  highlighted?: boolean
  x?: number
  y?: number
  activated?: boolean
  color?: string
  disabled?: boolean
}

export interface Tiles{
  firstTile: Tile
  secondTile: Tile
}


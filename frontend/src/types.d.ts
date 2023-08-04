export interface IUser {
  id?: string
  name: string
  city: string
  country: string
  favorite_sport: string
}

export interface IFilters {
  name?: string
  city?: string
  country?: string
  favorite_sport?: string
}
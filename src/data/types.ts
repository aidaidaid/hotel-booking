import { BoardTypeCode } from '../App.types'

export interface Country {
  id: number
  name: string
}

export interface Hotel {
  id: number
  name: string
  price: number
}

export interface MealOption {
  id: number
  name: string
  price: number
}

export interface BoardType {
  code: BoardTypeCode
  name: string
  description: string
}

export type MealPlan = {
  lunch: MealOption[]
  dinner: MealOption[]
}
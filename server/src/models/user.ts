import { Schema, model } from 'mongoose'
import { INGREDIENTS, IngredientsInterface } from '../static/ingredients'

export interface UserInterface {
  "user": {
    "username": string,
    "password": string,
  }
  "ingredients": IngredientsInterface
}

const UserSchema = new Schema({
  "user": {
    "username": { type: String, required: true, lowercase: true, unique: true },
    "password": { type: String, required: true },
  },
  "ingredients": { type: [String], enum: INGREDIENTS, default: [] }
})

export const User = model<UserInterface>('User', UserSchema)
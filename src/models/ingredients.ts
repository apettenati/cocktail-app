import mongoose from 'mongoose'
import { UserIngredientsInterface, INGREDIENTS } from '../static/ingredients'

const ingredientsSchema = new mongoose.Schema({
  "username": { type: String, required: true },
  "ingredients": {
    type: [String],
    enum: INGREDIENTS
  }
})

export const IngredientsModel = mongoose.model<UserIngredientsInterface>('Ingredients', ingredientsSchema)

new IngredientsModel({ "username": "amanda", "ingredients": [] }).save()
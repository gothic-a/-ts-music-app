import { ObjectId } from "mongoose"

export interface AddCommentDto {
    readonly username: string 
    readonly text: string
    readonly track: ObjectId
}
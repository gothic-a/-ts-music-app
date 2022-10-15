import { Injectable } from "@nestjs/common";

interface IUser {
    id: string | number
}

export type UsersType = IUser[]

@Injectable()
export class AppService {
    getUsers(): UsersType {
        return [{ id: 1 }]
    }
}
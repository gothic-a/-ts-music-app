import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { TrackModule } from "./track/track.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        TrackModule,
        MongooseModule.forRoot(process.env.MONGO_URI)
    ]
})
export class AppModule {

}
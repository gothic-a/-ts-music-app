import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { Track, TrackDocument } from "./schemas/track.schema";
import mongoose, { Model, ObjectId } from "mongoose";
import type { ObjectIdLike, ObjectId as ObjectIdB } from 'bson'

import { CreateTrackDto, CreateTrackFilesDto } from "./dto/create-track.dto";
import { AddCommentDto } from "./dto/add-comment.dto";
import { FileService } from "src/file/file.service";

import { FileType } from "src/file/file.service";

type ObjectIdIsValidParam = string | number | ObjectIdB | ObjectIdLike | Buffer | Uint8Array

function IsObjectId() {
    return function (
        target: Object, 
        key: string | symbol, 
        descriptor: PropertyDescriptor
    ) {
        const initialFunction = descriptor.value 

        descriptor.value = function(...args: any[]) {
            if(!mongoose.Types.ObjectId.isValid(args[0] as ObjectIdIsValidParam)) throw new HttpException('Incorrect track id', HttpStatus.BAD_REQUEST)
            else return initialFunction.apply(this, args)
        }

        return descriptor
    }
}

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>, 
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService
    ) {}

    async create(dto: CreateTrackDto, files: CreateTrackFilesDto): Promise<Track> {
        const audioPath = this.fileService.writeFile(FileType.AUDIO, files.audio[0])
        const imagePath = this.fileService.writeFile(FileType.IMAGE, files.image[0])

        const track = await this.trackModel.create({ ...dto, audio: audioPath, image: imagePath })
        
        return track
    }

    async getAll(page: number = 1, limit: number = 6): Promise<Track[]> {
        const offset = (page - 1) * limit 

        const tracks = await this.trackModel.find({}).skip(offset).limit(limit)
        return tracks
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            name: { $regex: new RegExp(query, 'i') }
        })
        return tracks
    }

    @IsObjectId()
    async getOne(id: string): Promise<Track | never> {
        const track = await this.trackModel.findById(id).populate('comments', ['text', 'username'])
        return track
    }

    @IsObjectId()
    async delete(id: string): Promise<Track | never> {
        const track = await this.trackModel.findByIdAndDelete(id)
        return track
    }

    @IsObjectId()
    async addComment(trackId: string, dto: AddCommentDto): Promise<Comment | never> { 
        const track = await this.trackModel.findById(trackId)
        const comment = await this.commentModel.create(dto)
        
        track.comments.push(comment._id)
        await track.save()
        
        return comment
    }

    @IsObjectId()
    async addListen(id: string): Promise<void | never> {
        const track = await this.trackModel.findById(id)
        ++track.listens

        await track.save()
    }
}
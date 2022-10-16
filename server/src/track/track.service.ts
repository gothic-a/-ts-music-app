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

    async getOne(id: string): Promise<Track | never> {
        if(!mongoose.Types.ObjectId.isValid(id as ObjectIdIsValidParam)) throw new HttpException('invalid id', HttpStatus.BAD_REQUEST)
        
        const track = await this.trackModel.findById(id).populate('comments', ['text', 'username'])
        return track
    }

    async delete(id: string): Promise<Track | never> {
        if(!mongoose.Types.ObjectId.isValid(id as ObjectIdIsValidParam)) throw new HttpException('invalid id', HttpStatus.BAD_REQUEST)

        const track = await this.trackModel.findByIdAndDelete(id)
        return track
    }

    async addComment(dto: AddCommentDto): Promise<Comment | never> { 
        const id = dto.track

        if(!mongoose.Types.ObjectId.isValid(id as ObjectIdIsValidParam)) throw new HttpException('invalid id', HttpStatus.BAD_REQUEST)

        const track = await this.trackModel.findById(id)
        const comment = await this.commentModel.create(dto)
        
        track.comments.push(comment._id)
        await track.save()
        
        return comment
    }

    async addListen(id: string): Promise<void | never> {
        if(!mongoose.Types.ObjectId.isValid(id as ObjectIdIsValidParam)) throw new HttpException('invalid id', HttpStatus.BAD_REQUEST)

        const track = await this.trackModel.findById(id)
        ++track.listens

        await track.save()
    }
}
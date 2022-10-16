import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Model, ObjectId } from "mongoose";

import { CreateTrackDto, CreateTrackFilesDto } from "./dto/create-track.dto";
import { AddCommentDto } from "./dto/add-comment.dto";
import { FileService } from "src/file/file.service";

import { FileType } from "src/file/file.service";

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

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments', ['text', 'username'])
        return track
    }

    async delete(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findByIdAndDelete(id)
        return track
    }

    async addComment(dto: AddCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.track)
        const comment = await this.commentModel.create(dto)
        
        track.comments.push(comment._id)
        await track.save()
        
        return comment
    }

    async addListen(id: ObjectId): Promise<void> {
        const track = await this.trackModel.findById(id)
        ++track.listens

        await track.save()
    }
}
import mongoose, {Document, Schema} from "mongoose";

export interface IUrl extends Document {
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    createdAt: Date;
}

const urlSchema: Schema = new Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

export const Url = mongoose.model<IUrl>("Url", urlSchema);

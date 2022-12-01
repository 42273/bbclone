import mongoose from 'mongoose'

export interface RoomShcemaProps {
    roomId: number;
    email: string;
    group?: string;
    property?: string | null;
    privacy?: string | null;
    location?: {
        coordinate: { lat: number, lng: number }, info: {
            "country"?: string,
            "administrative_area_level_1"?: string,
            "administrative_area_level_2"?: string,
            "postal_code"?: number,
            "sublocality_level_4"?: string,
            "sublocality_level_1"?: string,
        }
    } | null;
    floorPlan?: {guest:number,bed:number, bedroom:number, bathroom:number} | null;
    amenities?: Array<string> | null;
    photo?: Array<string> | null;
    phase?: string;
    complete?: { complete: boolean, Date: number | null };
    price?: { price: number | null, discount: boolean, count: number };
    title?: string | null;
}

const accountSchema = new mongoose.Schema<RoomShcemaProps>({
    roomId: { type: Number, unique: true, required: true },
    email: { type: String, required: true },
    group: String,
    property: { type: String, default: null },
    privacy: { type: String, default: null },
    location: { type: Object, default: null },
    floorPlan: { type: Object, default: null },
    amenities: { type: Array, default: null },
    photo: { type: Array, default: null },
    phase: String,
    complete: { complete: { type: Boolean, default: false }, Date: { type: Number, default: null } },
    price: { price: { type: Number, default: null }, discount: { type: Boolean, default: false }, count: { type: Number, default: 3 } },
    title: { type: String, default: null },

});

export default (mongoose.models.Room as mongoose.Model<RoomShcemaProps> || mongoose.model<RoomShcemaProps>("Room", accountSchema));
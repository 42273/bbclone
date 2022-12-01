import mongoose from 'mongoose'

export interface PropertyShcemaProps {
    group: string;
    image?: string;
    types: Array<object>;
}

const accountSchema = new mongoose.Schema<PropertyShcemaProps>({
    group: String,
    image: String,
    types: [Object],
});

export default (mongoose.models.Property as mongoose.Model<PropertyShcemaProps> || mongoose.model<PropertyShcemaProps>("Property", accountSchema));
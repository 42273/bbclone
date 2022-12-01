import mongoose, { mongo } from 'mongoose'

export interface AccountShcemaProps {
    email: string;
    lastName?: string | null;
    firstName?: string | null;
    birthday?: Date | null;
    password?: string;
    marketing?: Date | null | boolean;
    policy?: Date | null | boolean;
    provider?: { type: String, default: "credentials" };
    providerAccountId?: { type: String };
    hostInfo?:{type:Object}
}

const accountSchema = new mongoose.Schema<AccountShcemaProps>({
    email: { type: String, required: true, unique: true },
    lastName: { type: String, default: null },
    firstName: { type: String, default: null },
    birthday: { type: Date, default: null },
    password: { type: String },
    marketing: { type: Date, default: null },
    policy: { type: Date, default: null },
    provider: { type: String, default: "credentials" },
    providerAccountId: { type: String, },
    hostInfo:{type:Object, default:{}}
});

export default (mongoose.models.Account as mongoose.Model<AccountShcemaProps> || mongoose.model<AccountShcemaProps>("Account", accountSchema));
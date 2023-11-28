import { Schema, Types } from 'mongoose';

export interface AccountDB {
  _id: Types.ObjectId;
  // active: boolean;
  name: string;
  username: string;
  hashedPassword: string;
}

export const accountDbSchema: Schema = new Schema<AccountDB>(
  {
    name: { type: String, required: true, trim: true,
      length: { min: 3, max: 20 }, },
    hashedPassword: { type: String, required: true ,trim: true},
    username: {
      type: String,
      index: true,
      required: true,
      unique: true,
      trim: true,
      length: { min: 8 },
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);


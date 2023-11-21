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
    name: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    username: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);


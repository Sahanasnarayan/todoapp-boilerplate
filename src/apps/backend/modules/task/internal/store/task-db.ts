import { Schema, Types } from 'mongoose';

export interface TaskDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  title: string;
  description: string;
  isComplete: boolean;
}

export const taskDbSchema: Schema = new Schema<TaskDB>(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      index: true,
      required: true,
    },
    title: {
      type: String,
      index: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);




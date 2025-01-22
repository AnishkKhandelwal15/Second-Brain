import {Schema , model} from 'mongoose';
import { Types } from '../enums/types.enums';

const contentSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [128, 'Title must be no longer than 128 characters'],
    },
    content: {
        type: String,
        required: [true, 'Please enter a content'],
        minlength: [3, 'Content must be at least 3 characters long'],
        maxlength: [1024, 'Content must be no longer than 1024 characters'],
    },
    type: {
        type: String,
        enum: Object.values(Types),
        required: [true, 'Please enter a type'],
        enums: Types,
    },
    link: {
        type: String,
        minlength: [3, 'Link must be at least 3 characters long'],
        maxlength: [1024, 'Link must be no longer than 1024 characters'],
    },
    tags: {
        type: [Schema.Types.ObjectId],
        ref: 'Tags'

    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: [true, 'Please enter a userId'],
    }
},

 {timestamps: true}

);

export const ContentModel = model('ContentModel', contentSchema);
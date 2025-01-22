import{Schema, model, Document} from 'mongoose';
import { UserModelInterface } from './users.model';
import {hash} from 'bcrypt';

interface ShareLinkInterface extends Document{
    hash: string;
    userId:Schema.Types.ObjectId | UserModelInterface;
    createHash(password: string): Promise<string>;
}

const linkModelSchema = new Schema<ShareLinkInterface>({
    hash:{
        type: String,
        required: true,
        unique: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
        unique: true
    }
},
    {timestamps: true}
);

linkModelSchema.methods.createHash = function (length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
/*function(5)//callback itrate for all length
Characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
array.from({5},(callback))
(math.random=>0-1 ==> 0.45 ==> 65*0.45=27.9)
math.floor==> 27.9->27
charAt==>b
.join=['b', 'c', '3', ... ... ... ] ===>"bc3......"*/
};


export const Link = model<ShareLinkInterface>('Links', linkModelSchema);


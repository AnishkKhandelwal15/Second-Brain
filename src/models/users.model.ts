import { Schema, Document,model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserModelInterface extends Document {
  username: string;
  password: string;
  createHash(password: string): Promise<string>;
  verifyPassword(password: string): Promise<boolean>;
}

const userModelSchema: Schema<UserModelInterface> = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        lowercase: true,
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [128, 'Password must be no longer than 128 characters'],
    },
    password: {
        type: String ,   
        required: [true, 'Please enter a password']
    }
});

userModelSchema.methods.createHash = async function (password: string): Promise<string> {
    return await bcrypt.hash(password, 10); //10 is salt round here
};

userModelSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export const UserModel = model<UserModelInterface>('UserModel', userModelSchema);
    
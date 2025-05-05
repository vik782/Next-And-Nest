import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  _id: ObjectId;

  @Prop()
  user_id: Types.ObjectId;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  address: string;

  @Prop()
  phone_number: string;

  @Prop()
  phone_country_code: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

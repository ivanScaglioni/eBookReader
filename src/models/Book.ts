import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";

import { models } from "mongoose";

class ImageClass {
  @prop({ type: String })
  public secure_url: string;

  @prop({ type: String })
  public public_id: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class BookClass {
  @prop({ required: true, type: String })
  public title: string;

  @prop({ type: String })
  public description?: string;

  @prop({ type: () => [ImageClass] })
  public images: ImageClass[];

  @prop({ required:true,  type: String })
  public slug: string;

  @prop({type:String})
  public author:string;

}

const   Book = getModelForClass(BookClass);

export default Book;

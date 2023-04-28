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
export class ProductClass {
  @prop({ required: true, type: String })
  public name: string;

  @prop({ required: true, type: String })
  public price: number;

  @prop({ type: String })
  public description?: string;

  @prop({ type: () => [ImageClass] })
  public images: ImageClass[];

  @prop({ required:true,  type: String })
  public slug: string;

  @prop({required:true, type: Number })
  public stock: number;

  @prop({type:String})
  public mark:string;

}

const Product = getModelForClass(ProductClass);

export default Product;

import GuideService from "../services/GuideService";
import { ObjectId } from "mongodb";
import { BaseModel } from "./BaseModel";

export interface DeSerializedGuide {
  _id?: ObjectId;
  name: string;
  cookbook: ObjectId;
  sections: ObjectId[];
}

export interface SerializedGuide {
  id?: ObjectId;
  name: string;
  cookbook: ObjectId;
  sections: ObjectId[];
}

export class Guide extends BaseModel<Guide, SerializedGuide> {
  public _id: ObjectId | undefined;
  public name: string;
  public cookbook: ObjectId;
  public sections: ObjectId[];

  constructor({ id, name, cookbook, sections }: SerializedGuide) {
    super(new GuideService());
    this._id = id;
    this.name = name;
    this.cookbook = cookbook;
    this.sections = sections;
  }

  public deserialize(): DeSerializedGuide {
    return new GuideService().deserialize(this);
  }

  public serialize(): SerializedGuide {
    return new GuideService().serialize({
      _id: this._id,
      name: this.name,
      cookbook: this.cookbook,
      sections: this.sections,
    });
  }
}

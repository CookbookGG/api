import PostService from "../services/PostService";
import { ObjectId } from "mongodb";
import { BaseModel } from "./BaseModel";
import { AppInjector } from "../app";

export interface DeSerializedPost {
  _id?: ObjectId;
  user: ObjectId;
  body: string;
  tags: ObjectId[];
}

export interface SerializedPost {
  id?: ObjectId;
  user: ObjectId;
  body: string;
  tags: ObjectId[];
}

export class Post extends BaseModel<Post, SerializedPost> {
  public _id: ObjectId | undefined;
  public user: ObjectId;
  public body: string;
  public tags: ObjectId[];

  constructor({ id, user, body, tags }: SerializedPost) {
    super(AppInjector.injectClass(PostService));
    this._id = id;
    this.user = user;
    this.body = body;
    this.tags = tags;
  }

  public deserialize(): DeSerializedPost {
    return AppInjector.injectClass(PostService).deserialize(this);
  }

  public serialize(): SerializedPost {
    return AppInjector.injectClass(PostService).serialize({
      _id: this._id,
      user: this.user,
      body: this.body,
      tags: this.tags,
    });
  }
}

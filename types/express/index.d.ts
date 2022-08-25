
import { Request } from "express";
import { Staff } from "../../src/database/models";
export interface IGetUserAuthInfoRequest extends Request {
  staff?: Staff;
}
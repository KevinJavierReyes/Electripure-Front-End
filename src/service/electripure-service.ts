import { AddContactRequest, CreateUserRequest, ResendEmailRequest, UpdateUserRequest } from "../interfaces/electripure-service";
import { BaseService } from "./base-service";
import environment from "./../config/env";
import { toast } from "react-toastify";
import { ResponseGeneric } from "../interfaces/base-service";

export default class ElectripureService extends BaseService {

  static async updateUser(payload: UpdateUserRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/update_user?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async addContact(payload: AddContactRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/add_contact?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getUsers(): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_users`;
    const response = await this.requestPost(url, {});
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async resendEmail(payload: ResendEmailRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/resend_email?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async createUser(payload: CreateUserRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/create_user?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }
    
}
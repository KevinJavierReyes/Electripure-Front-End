import { AddContactRequest, AuthorizationCodeRequest, AuthorizationCodeValidateRequest, CreateUserRequest, ForgotPasswordRequest, LoginRequest, ResendEmailRequest, UpdatePasswordRequest, UpdateUserRequest, ValidateTokenRequest } from "../interfaces/electripure-service";
import { BaseService } from "./base-service";
import environment from "./../config/env";
import { toast } from "react-toastify";
import { ResponseGeneric } from "../interfaces/base-service";

export default class ElectripureService extends BaseService {

  static async login(payload: LoginRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/login?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
    return response;
  }
  
  static async validateToken(payload: ValidateTokenRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/validate_token?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
    return response;
  }

  static async authorizationCode(payload: AuthorizationCodeRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/autherization_code?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
    return response;
  }

  static async authorizationCodeValidate(payload: AuthorizationCodeValidateRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/autherization_code_validate?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
    return response;
  }

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

  static async forgotPassword(payload: ForgotPasswordRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/forgot_password?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
    return response;
  }

  static async updatePassword(payload: UpdatePasswordRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/update_pwd?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
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

  static async getCompanies(): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_companies`;
    const response = await this.requestPost(url, {});
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }
    
}
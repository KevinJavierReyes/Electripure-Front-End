import { AddContactRequest, AuthorizationCodeRequest, AuthorizationCodeValidateRequest, CreateUserRequest, ForgotPasswordRequest, GetAmpsDataRequest, GetCompaniesByUserRequest, GetPowerDataRequest, GetVoltsDataRequest, LoginRequest, ResendEmailRequest, ToogleCompanyStateRequest, ToogleUserStateRequest, UpdatePasswordRequest, UpdateUserRequest, UploadImageRequest, ValidateTokenRequest } from "../interfaces/electripure-service";
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
    // make the changes here 
    const url = `${environment.ELECTRIPURE_ENDPOINT}/autherization_code_validate?${this.jsonToQueryParams(payload)}`;
    const response = await this.requestPost(url, payload);
    return response;
  }

  static async updateUser(payload: UpdateUserRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/update_user?${this.jsonToQueryParams(payload)}`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, payload, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async addContact(payload: AddContactRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/add_contact?${this.jsonToQueryParams(payload)}`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, payload, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async createCompany(payload: any) : Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/create_company`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, payload, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getUsers(): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_users`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, {}, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async resendEmail(payload: ResendEmailRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/resend_email?${this.jsonToQueryParams(payload)}`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, payload, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }
  static async toogleUserState(payload: ToogleUserStateRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/change_status_user`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, payload, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async toogleCompanyState(payload: ToogleCompanyStateRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/change_status_company`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, payload, header_auth);
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
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, payload, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getCompanies(): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_companies`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, {}, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getCompaniesTable(): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_companies_table`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, {}, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }
  
  static async getCompaniesByUser(payload: GetCompaniesByUserRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_companies_by_id`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, payload, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async uploadImage(payload: UploadImageRequest): Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/update_image`;
    const header_auth = {"Authorization" : `Bearer ${localStorage.getItem('electripureJwt')}`}
    const response = await this.requestPost(url, payload, header_auth);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }
  
  static async getAmpsDataGraph(payload: GetAmpsDataRequest) : Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_chart1_A`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getVoltsDataGraph(payload: GetVoltsDataRequest) : Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_chart1_V`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getPowerActiveDataGraph(payload: GetPowerDataRequest) : Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_chart3_Active`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getPowerFactorDataGraph(payload: GetPowerDataRequest) : Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_chart3_Factor`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }


  static async getPowerApparentDataGraph(payload: GetPowerDataRequest) : Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_chart3_Apparent`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getPowerReactiveDataGraph(payload: GetPowerDataRequest) : Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_chart3_Reactive`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getPowerLine1DataGraph(payload: GetPowerDataRequest) : Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_chart3_V1`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getPowerLine2DataGraph(payload: GetPowerDataRequest) : Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_chart3_V2`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }

  static async getPowerLine3DataGraph(payload: GetPowerDataRequest) : Promise<ResponseGeneric> {
    const url = `${environment.ELECTRIPURE_ENDPOINT}/get_chart3_V3`;
    const response = await this.requestPost(url, payload);
    if (!response.success) {
      toast.error(response.error, {
        "position": "bottom-right"
      });
    }
    return response;
  }
}

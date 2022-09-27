import { ResponseGeneric } from "../interfaces/base-service";


export class BaseService {

    static jsonToQueryParams(data: any): string {
        let params:string[] = Object.keys(data).map((key: string): string => {
            return `${key}=${data[key]}`;
        });
        return params.join("&");
    }

    static requestPost(url: string, body: any, headers: any = {}): Promise<ResponseGeneric> {
        return new Promise((resolve, reject)=> {
            fetch(url, {
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  ...headers
                },
                body: JSON.stringify(body)
            }).then(async (response) => {
                const status = response.status;
                let data: any = null;
                let error: string | null = null;
                response.json().then((json)=> {
                    data = json;
                }).catch((err)=> {
                    error = err;
                }).finally(() => {
                    resolve({
                        "data": data,
                        "statusCode": status, 
                        "success": true,
                        "error": error
                    })
                });
              })
              .catch((err: any)=>{
                resolve({
                    "data": null,
                    "statusCode": null, 
                    "success": false,
                    "error": err.message
                })
              })
        });
    }

}
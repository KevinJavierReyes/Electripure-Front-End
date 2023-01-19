import { UploadedFileEntity } from "./../interfaces/entities";

function toUploadedFiles(uploadedFiles: any[]): UploadedFileEntity[] {
    return uploadedFiles.map((uploadedFile: any): UploadedFileEntity => {
        return {
            "id": uploadedFile["id"],
            "fileName": uploadedFile["File Name"],
            "addedBy": uploadedFile["Added By"],
            "dateAdd": uploadedFile["Date Add"],
            "link": uploadedFile["Link"],
            "type": uploadedFile["Type"],
            "dateRange": uploadedFile["Date Range"]
        };
    })
}

export default {
    toUploadedFiles
};
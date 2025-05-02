import { FeedbackPayload } from "@/interfaces/contact";
import axios, { AxiosRequestConfig } from "axios";
import { apicoUrls, googleSheets } from "../constants";

export interface SpreadSheetResponse {
    values: string[][];
}
export const sendFeedback = async (payload: FeedbackPayload) => {
    let values = Object.values(payload);
    const timestamp = new Date().toISOString();
    values = [...values, timestamp];
    const options: any = {
        method: "POST",
        url: `${apicoUrls.feedBack}/values/${googleSheets.feedBack.sheetName}:append`,
        params: {
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            includeValuesInResponse: true,
        },
        data: {
            values: [values],
        },
    };

    const response = await axios(options);
    return response;
}

export const getFeedbackData = async () => {
    const response = await axios.get<SpreadSheetResponse>(
        `${apicoUrls.feedBack}/values/${googleSheets.feedBack.sheetName}`
    );

    return response.data;
};

export const deleteFeedbackRow = async (index: number) => {
    const range = {
        sheetId: 0,
        dimension: "ROWS",
        startIndex: index + 1,
        endIndex: index + 2,
    };
    const options: AxiosRequestConfig = {
        method: "POST",
        url: `${apicoUrls.feedBack}:batchUpdate`,
        headers: {
            "Authorization": `Bearer 2f5bdbec92765503846b6821f1c7ae452ca1192ef88b6ab02f8636c5250c2c31`,
        },
        data: {
            requests: [
                {
                    deleteDimension: {
                        range,
                    },
                },
            ],
        },
    };

    const response = await axios(options);
    return response.data;
};

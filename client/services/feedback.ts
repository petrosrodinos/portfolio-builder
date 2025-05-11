// "use server";

import { FeedbackPayload } from "@/interfaces/contact";
import axios, { AxiosRequestConfig } from "axios";
import { apicoUrls, googleSheets } from "../constants/apico";

export interface SpreadSheetResponse {
    values: string[][];
}
export const sendFeedback = async (payload: FeedbackPayload) => {
    try {
        const values = Object.values(payload).map(value =>
            value !== null && value !== undefined ? String(value) : ''
        );

        const timestamp = new Date().toISOString();
        const rowData = [...values, timestamp];


        const options: AxiosRequestConfig = {
            method: "POST",
            url: `${apicoUrls.feedBack}/values/${googleSheets.feedBack.sheetName}:append`,
            params: {
                valueInputOption: "USER_ENTERED",
                insertDataOption: "INSERT_ROWS",
                includeValuesInResponse: true,
            },
            data: {
                values: [rowData],
            },
            headers: {
                "Content-Type": "application/json",
            }
        };

        const response = await axios(options);
        return response;
    } catch (error) {
        console.error('Error sending feedback:', error);
        throw error;
    }
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
            "Authorization": `Bearer ${process.env.APICO_API_KEY}`,
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

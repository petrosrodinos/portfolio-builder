import { FeedbackPayload } from "@/interfaces/contact";
import axios from "axios";
import { apicoUrls } from "../constants";

export const sendFeedback = async (payload: FeedbackPayload) => {
    let values = Object.values(payload);
    const timestamp = new Date().toISOString();
    values = [...values, timestamp];
    const options: any = {
        method: "POST",
        url: apicoUrls.feedBack,
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

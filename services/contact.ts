export const sendFeedback = async (payload: any) => {
    const response = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({ payload }),
    });
    return response.json();
}

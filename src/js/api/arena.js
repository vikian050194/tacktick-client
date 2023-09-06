import ajax from "./ajax";

export const fetch = async () => {
    return await ajax.get("arena");
};

export const submit = async (data) => {
    return await ajax.post("submit", data);
};
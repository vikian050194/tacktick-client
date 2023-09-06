import ajax from "./ajax";

export const userJoin = (data) => {
    return ajax.post("join", data);
};

export const userLeave = (id) => {
    return ajax.post("leave", { id });
};
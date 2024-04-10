export const getUsername = () => {
    return localStorage.getItem("username");
}

export const removeUsername = () => {
    localStorage.removeItem('username');
}
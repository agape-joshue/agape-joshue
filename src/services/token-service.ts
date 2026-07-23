const TOKEN_KEY = "agape-portfolio-access"

export const setToken = (token: string) => {
    sessionStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
    sessionStorage.removeItem(TOKEN_KEY)
}

export const getAccessToken = () => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    return token
}

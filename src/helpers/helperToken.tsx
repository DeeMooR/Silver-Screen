// запрос на сервер для обновления токена
export const updateAccessToken = () => {
    try {
        let refresh = localStorage.getItem('refresh');
        fetch(
            "https://studapi.teachmeskills.by/auth/jwt/refresh/",
            {
                method: "POST",
                body: JSON.stringify({ refresh }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((data) => data.json())
        .then(({access}) => {
            if (access) {
                localStorage.setItem("access", access);
                console.log('Access token has been updated');
            }
        });
    } catch (err) {
        console.log(err);
    }
};

// обновлеяет токен или удаляет его 
export const startTokenRefreshTimer = (token: string) => {
    if (token) {
        const currentTime = Date.now();
        const expirationTimestamp = decodeJwt(token).payload.exp;
        const timeUntilExpiration = expirationTimestamp*1000 - currentTime;

        if(timeUntilExpiration > 30000) {
            setInterval(updateAccessToken, timeUntilExpiration - 30000);
        } else {
            localStorage.removeItem('access');
        }
    }
};

// декодирование строки из base64url в формат base64
const base64UrlDecode = (base64Url: string) => {
    const padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
    const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return Array.from(decoded).map((char) => char.charCodeAt(0));
};

// декодирование JSON JWT Token
export const decodeJwt = (jwtToken: string) => {
    const [headerBase64Url, payloadBase64Url, signatureBase64Url] = jwtToken.split('.');
    const header = JSON.parse(String.fromCharCode(...base64UrlDecode(headerBase64Url)));
    const payload = JSON.parse(String.fromCharCode(...base64UrlDecode(payloadBase64Url)));
    return { header, payload };
};

// оставшееся время жизни токена
export const expToMinutes = (expTimestampInSeconds: number) => {
    const expTimestampInMillis = expTimestampInSeconds * 1000;
    const currentTimeInMillis = Date.now();
    const timeDifferenceInMillis = expTimestampInMillis - currentTimeInMillis;
    const timeDifferenceInMinutes = timeDifferenceInMillis / 60000;
    return timeDifferenceInMinutes;
};
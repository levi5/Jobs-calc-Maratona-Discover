export function getToken(req, cookieName){
    const cookie = req.headers.cookie
    const values = cookie.split(";")
    let newToken = ''
    values.map((value) =>{
        let key     = (value.split('=')[0]).trim()
        let token   = (value.split('=')[1]).trim()
        newToken = key === cookieName ? token:newToken
    
    })
    return newToken
}



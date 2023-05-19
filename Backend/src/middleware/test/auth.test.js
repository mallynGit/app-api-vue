const auth = require('../auth')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJ1c2VybmFtZSI6InBlcGl0byIsImVtYWlsIjpudWxsfSwiaWF0IjoxNjg0NDc0NzY3LCJleHAiOjE2ODQ0NzUyMDF9.mR46EBOOAdSFHlPYJkE3U2GomEv3hc3qUecQi_LTw-Q"
const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJ1c2VybmFtZSI6InBlcGl0byIsImVtYWlsIjpudWxsfSwiaWF0IjoxNjg0NDc0NzY3LCJleHAiOjE2ODQ0ODUyMDF9.svgY7oVldpkdEF92xVaJ0JfD5XHUE7Cy80uMpgQzp_8"
const token3 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJ1c2VybmFtZSI6InBlcGl0byIsImVtYWlsIjpudWxsfSwiaWF0IjoxNjg0NDc4NzY3LCJleHAiOjE2ODQ0ODIzNjd9.olLW_B8HlNQRpUZwKQiyc7F8N75eNITUppEXbi2Gwuw"

const tokengen = auth.generateToken({name: "pepito"})

test('el token que se genera se valida bien', ()=>{
    expect(auth.verifyToken(tokengen)).toBe(true)
})


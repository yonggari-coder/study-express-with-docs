// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used
// for signing the cookies.

app.use(cookieParser())를 사용하면, 요청 쿠키를 파싱만 한다. ⇒ req.cookies 만 채워지게 된다.

app.use(cookieParser(’my secret’)) 서명 검증을 한다. ⇒ 유효한 서명 쿠키는 req.signedCookies,로, 일반 쿠키는 req.cookies로

예제에 쓰여있는 말은,

요청 쿠키를 파싱하고, req.cookies를 채워넣는다. req.signedCookies는 시크릿이 통과되었을 때에 한해서 채워넣는다. (서명검증에 성공했다는 말)

이때 사용하는 시크릿은 쿠키를 만들 때도 사용한다.

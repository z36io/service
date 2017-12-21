POST /:table HTTP/1.1
Host: db.z36.io
Cache-Control: no-cache

{
"from":{"M":{"email":{"S":"test@mail.com"},"type":{"S":"paypal"}}},
"to":{"M":{"type":{"S":"bitcoin"}}},
"meta":{"M":{}}
}

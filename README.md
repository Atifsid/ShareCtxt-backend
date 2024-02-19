# Backend for Wong

## Setup Instructions
- Clone this repo -> run ```npm install```
- Signup on [CloudFlare](https://www.cloudflare.com/)
- Create a D1 database named anything (eg. WONG_DB)
- Create a Table named 'Documents' with fields as
  - Col name: id , title, content
  - type: text, text, text
  - **Set primary key only for id**
- Change the following in wrangler.toml
    - database_name = "Enter your DB name here" 
    - database_id = "Enter your DB_ID name here"

## Run
```
npm run dev
```

### To check everything is working fine
- Hit ```GET : http://127.0.0.1:XXXX (eg. 8787)``` to check server is working fine.

## Deploy
```
npm run deploy
```

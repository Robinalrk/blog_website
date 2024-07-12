# blog_website
for getting backkend jwt key for sql

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

use gen.js for generating secert session key for sql

MAKE SURE YOU ADJUST THE .env file by replacing 
username,password & JWT_key

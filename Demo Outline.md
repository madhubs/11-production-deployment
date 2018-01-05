Lab 11 - TLDR

- mkdir hello-heroku and cd into it
- Create server directory and cd into it
- git init
- create server.js in root
- npm init project
- npm install express
- Build out skeleton express app in server.js with single test route
- Test locally 
- Now let’s push to Heroku!
- heroku create [app-name] 
	- e.g. hello-heroku, or something else if not available
- git push heroku master
- heroku open
- Navigate to test route
- May need to do heroku ps:scale web=1 to kick off
- Let’s make a simple client app to talk to it
- Create client directory as sibling of server and cd into it
- git init
- Create index.html
- Load jQuery in index
- Create app.js and load it index
- Have jQuery make Ajax call to server’s test route and display result
- Run client locally

WTF = CORS
NPM cors FTW

Run client locally again. Boom!

That’s awesome but what about the database?

- Make a local one, call it whatever
    - Remember to connect!
- Create a table in it and add a record
- Hook up a GET route to it in server
	- Make sure to import pg package
- Test route in browser

Great, we have a local database hooked up to server LOCALLY but we want it REMOTE

- Go to Resources tab in Heroku for your app
- Choose Heroku Postgres add on
- Choose settings tab and click Reveal Config Vars
- Notice the DATABASE_URL entry. Nice!
- Push server changes to Heroku
- Open remote app and test route
- Not working - digging into error seems to be db related. Oh wait we have a database set up but no tables in it!
- heroku pg:push [database name] DATABASE_URL --app   [app name]
- Try again! Ballin

Let’s hook up local client to the new route on REMOTE server

Shazam




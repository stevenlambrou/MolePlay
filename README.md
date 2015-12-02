#MolePlay Readme  

###Team ThreeTwenty


## Installing the WebApp

  * Download and Run the appropriate installer from https://nodejs.org/en/download/
  * Enter the following command in your CLI:
  ```
  $ npm install -g express-generator@4
  ```
  
  
## Running the WebApp

  Enter the following CLI instructions when in the WebApp directory:
  ```
  $ npm install
  $ npm start
  ```
  
  The WebApp can be viewed in your browser if you navigate to: localhost:3000
  

Completed views can be viewed [here](https://tranquil-eyrie-6820.herokuapp.com/devsitemap) without running the server on your computer.

## Installing PostgreSQL

  These instructions are specific to a Mac, which is probably going to be the same on anything you can get bash on (including using powershell for windows or git-bash)

  To actually install PostgreSQL you will need to install Homebrew, the greatest package manager for developers: http://brew.sh/

  Then, from any directory, run the following command (bash):
  ```
  $ brew install postgresql
  ```

  Note, this will install PostgreSQL version 9.4.5

  Enter the following in bash when in the `MolePlay` repo:
  ```
  $ sudo mkdir /data
  $ sudo chmod 775 data
  $ sudo chown 'username' data
  $ initdb -D data
  ```

  Note that you should not type 'username' - you should type your computer's terminal username. Mine was `bob`.

  The command above initializes the database. To run it again from the `MolePlay` repo, type this command

  ```
  $ postgres -D data
  ```

  From here (when you have the database running) you should try to run the `postgres_setup.sql` file. Note the `.sql` is the extension for SQL, the extension for all SQL server scripts. To do this, run the following command:

  ```
  $ psql -d postgresql -f postgres_setup_1.sql
  $ psql -d moleplay -f postgres_setup_2.sql
  ```

  After doing this, go to `/WebApp/public/js/db_config.js` and type in your username and password that went along with your database setup. If you have unix and followed the above instructions, username should be your unix username and the password should be `password`.

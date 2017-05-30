### MySQL setup

**installation** sudo apt-get install mysql-server-5.7 -y


Only *sql_setup.sh* should be executed within this directory. sql_setup does the following:
* creates a new user for reading/writing
* creates a new DB to house tables
* creates plants, plantgroups, users, and readings tables
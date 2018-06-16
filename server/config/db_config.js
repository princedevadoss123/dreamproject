const db_config = {
    redis: {	
        port: 6379,
        host: "127.0.0.1",
        password:''
    }
	postgres: {
		host: "localhost",
		dbuser: "postgres",
		dbpassword: "jameela",
		dbname: "userdb"
	}
}; 

module.exports = db_config
 


const app = require('express')()
const chalk = require('chalk')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'Project_Mgmt';
const PORT = process.env.PORT || 8000

const connect = callback => {
    MongoClient.connect(url, {useUnifiedTopology : true}, 
    (err, client) => {
        console.log(chalk.bgGreen.black(" Connected successfully to server "))
        const db = client.db(dbName);
        return callback(err,db)
    })
}

app.use(cors());
app.use(bodyParser.json());


connect((err, db) => {
    
    if(err) {
        console.log(chalk.bgRed.black('Error connecting to database'))
        return
    }
    
    fs.readdirSync(__dirname + '/routes').map(route => {
        let name = route.substr(0, route.indexOf('.'))
        require('/routes/' + name)(app, db)
    })
    
    app.listen(PORT, () => {
        console.log(chalk.bgBlue.black(`App is running on port ${PORT}`))
    })

})
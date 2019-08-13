const mongodb = require(`mongodb`)
const MongoClient = mongodb.MongoClient

const connURL = `mongodb://localhost:27017`
const dbName = `task-manager`

MongoClient.connect(connURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log(error)
    }

    const db = client.db(dbName)

    db.collection(`users`).insertOne({
        name: `Abhilash Vadnala`
    })
})

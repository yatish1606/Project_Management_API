const chalk = require('chalk')

module.exports = (app, db) => {

    /******************** 
    GET REQUESTS FOR USER
    *********************/

    // Get all users
    app.get('/users', (req, res) => {
        
        console.log(chalk.gray('Fetching all users'))
        db.collection('users')
            .find()
            .toArray(((err, data) => {
                if(err) {
                    return console.log(chalk.bgRed('Error while getting all users'))
                }
            return res.json(data)
        }))
    })

    // Get single user by id
    app.get('/users/:id', (req, res) => {
        
        console.log(chalk.gray('Fetching user with id ', req.params.id))
        
        db.collection('users')
            .find({_id : req.params.id})
            .limit(1)
            .toArray(((err, data) => {
                if(err) {
                    console.log(chalk.bgRed('Error while fetching user with id ', req.params.id))
                    res.status(404).json({error: 'User not found'})
                }
            return res.status(200).json(data)
        }))

    })



    /******************** 
    POST REQUESTS FOR USER
    *********************/

    // Create a new user
    app.post('/users', (req, res) => {
        
        console.log(chalk.gray('Creating a new user'))

        let {fname, lname, email, password, designation, profile_photo} = req.body
        
        let userInfo = {
            'fname' : fname,
            'lname' : lname,
            'email' : email,
            'password' : password,
            'designation' : designation,
            'profile_photo' : profile_photo,
        }
        db.collection('users').insertOne(userInfo, (err, data) => {
            if(err) {
                console.log(chalk.bgRed('Error while creating new user'))
                res.status(400).json({error: 'Bad request for user creation'})
            }
            return res.status(200).json({
                userInserted: data.ops[0],
                success : data.result.n && data.result.ok
            })
        })
    })


    /******************** 
    DELETE REQUESTS FOR USER
    *********************/

    // Delete all users
    app.delete('/users', (req, res) => {
        
        console.log(chalk.gray('Deleting all users'))
        db.collection('users')
            .deleteMany( (err, data) => {
                if(err) {
                    return console.log(chalk.bgRed('Error while deleting all users'))
                }
            return res.json(data)
        })
    })
}
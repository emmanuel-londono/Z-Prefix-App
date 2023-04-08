//Imports
const express = require('express');
const app = express();
const cors = require('cors')
const session = require('express-session')
const knex = require('knex')(require("./knexfile.js")[process.env.NODE_ENV || 'development']);
const PORT = 3001;

//Admin User Create Key
const adminKey = '1234'


//Middleware
app.use(express.json());
app.use(cors());
//Session 
app.use(session({
    secret: 'sessionsecret',
    cookie: { maxAge: 300000 },
    saveUninitialized: false
}))




//#region Express Routes

app.get('/', async function (req, res) {
    res.send('Greetings Human!')
})


//#region Express Routes pertaining to USERS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Authenticate Login Credentials 
app.post('/login', async function (req, res) {
    postCredentials(req, res);
})

//Create a new Account
app.put('/signup', async function (req, res) {
    putSignUp(req, res);
})
//Get all accounts
app.get('/account', async function (req, res) {
    getAllAccounts(req, res);
})

app.post('/account', async function (req, res) {
    getSpecificAccount(req, res);
})

//Modify an existing Account
app.patch('/account', async function (req, res) {

    patchAccount(req, res);
})

//Delete an existing Account
app.delete('/account', async function (req, res) {
    deleteAccount(req, res);
})

//#endregion




//#region Express Routes pertaining to ITEMS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Get item list from inventory
app.get('/items', async function (req, res) {
    getItems(req, res);
})


//Get/Search for specific item from inventory
app.post('/items', async function (req, res) {
    getSpecificItem(req, res);
})


//Create a new item
app.put('/items', async function (req, res) {
    putNewItem(req, res);
})


//Modify an existing Item
app.patch('/items', async function (req, res) {
    console.log(req.body)
    patchItem(req, res);
})

//Delete an existing Item by id
app.delete('/items', async function (req, res) {
    console.log(req.body)
    deleteItem(req, res);
})

//#endregion


app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});


//#endregion













//#region Controllers

//#region Item Account Controllers ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Query Database for Credentials passed in the request body.
const postCredentials = async (req, res) => {
    if (req.body.username && req.body.password) {
        let { username, password } = req.body

        //Authenticate username
        let usernameMatcher = await getUsername(username);
        //Authenticate Password  
        let passwordMatcher = await getPassword(password);
        if (passwordMatcher === undefined || usernameMatcher === undefined)
        //User Auth Failed
        {
            console.log("Returning 404"); return res.status(404).send('Wrong Credentials')
        } else
        //User Auth Success
        {
            console.log('\n User Authenticated Successfully! \n')
            let sid = req.sessionID
            req.session.authenticated = true;
            req.session.cookie.path = '/login'
            req.session.session_id = sid

            return knex("user")
                .where("username", username)
                .modify((queryBuilder) => queryBuilder.update({ session_id: sid })).then(() => {
                    console.log(sid)
                    console.log(req.session)
                }).then(data => {
                    return knex
                        .select('*')
                        .from('user')
                        .where({ username: username, password: passwordMatcher }).then(data => {

                            req.session.user_id = data[0].id
                            req.session.username = data[0].username
                            req.session.password = data[0].password
                            req.session.first_name = data[0].first_name
                            req.session.last_name = data[0].last_name
                            return res.json(req.session)

                        })
                })




        }
    } else
    //Inputed Username or Password Invalid Not truthy; Auth Failed
    {
        return res.status(404).send('Wrong Credentials')
    }
}


//Create Account and add to database with PUT
const putSignUp = async (req, res) => {
    console.log(req.body)

    let { first_name, last_name, username, password } = req.body;
    return knex("user")
        .insert({
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password,
        })
        .then((data) =>
            knex.select('*')
                .from('user')
                .where({ username: username, password: password, first_name: first_name, last_name: last_name, })

        ).then(data => { console.log(data); return res.status(202).json(data) })

}



//Get all Accounts
const getAllAccounts = async (req, res) => {
    return knex
        .select('id', "first_name", "last_name", "username")
        .from('user')
        .then(data => {
            console.log('\n Get Users Success! \n')
            console.log(data)
            if (!data.length) {
                return res.status(404).json({ "msg": "Those users don't exist!" })
            }
            res
                .status(200)
                .json(data)
        })
}



//Get Specific Account

const getSpecificAccount = async (req, res) => {
    console.log(req.body)

    let { user_id, username } = req.body
    return knex
        .select('user_id', 'username', 'password', 'first_name', 'last_name')
        .where({ username: username, password: password, first_name, last_name })
        .from('user')
        .then(data => {
            if (!data.length) {
                console.log('Returning 404')
                return res.status(404)
            } else {
                console.log(`\n Get User Success! \n`)
                console.log(data)
                res
                    .status(200)
                    .json(data)
            }
        })

}







//Modify Existing Account
const patchAccount = async (req, res) => {
    if (req.body.first_name && req.body.new_first_name && req.body.last_name && req.body.new_last_name && req.body.username && req.body.new_username && req.body.password && req.body.new_password) {
        let { first_name, new_first_name, last_name, new_last_name, username, new_username, password, new_password } = req.body;
        return knex("user")
            .where({ first_name: first_name, last_name: last_name, username: username, password: password })
            .modify((queryBuilder) => queryBuilder.update({ first_name: new_first_name, last_name: new_last_name, username: new_username, password: new_password }))
            .then((data) => {
                return knex("user")
                    .where({ first_name: new_first_name, last_name: new_last_name, username: new_username, password: new_password })
            }).then (data => { return res.status(200).json(data)})
    }else{
        return res.status(404).send('Wrong Input Detected. Make sure to enter a value into each text form!')
    }

}



//Delete Existing Account with correct username from database
const deleteAccount = async (req, res) => {
    if (req.body.id) {
        let { id } = req.body;
        knex("user")
            .where("id", id)
            .del()
            .then(() => {
                console.log(`Deleted user with id = ${id}`);
                return res.status(200).send('User Deleted!');
            })
    } else {
        return res.status(404).send('Delete unsuccessful, wrong user_id')
    }

}


//#region Item Controllers ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Get all items from database
const getItems = async (req, res) => {

    return knex
        .select('*')
        .from('item')
        .then(data => {
            console.log('\n Get items Success! \n')
            console.log(data)
            if (!data.length) {
                return res.status(404).json({ "msg": "That item does not exist!" })
            }
            res
                .status(200)
                .json(data)
        })
}




//Search for specific item in database 
const getSpecificItem = async (req, res) => {
    console.log(req.body)
    if (req.body.id) {
        let { id } = req.body
        return knex
            .select('*')
            .where({ id: id })
            .from('item')
            .then(data => {
                if (!data.length) {
                    console.log('Returning 404')
                    return res.status(404)
                } else {
                    console.log(`\n Get item of id: ${id} Success! \n`)
                    console.log(data)
                    res
                        .status(200)
                        .json(data)
                }
            })
    } else if (req.body.user_id) {
        let { user_id } = req.body
        return knex
            .select('*')
            .where({ user_id: user_id })
            .from('item')
            .then(data => {
                if (!data.length) {
                    console.log('Returning 404')
                    return res.status(404)
                } else {
                    console.log(`\n Get item(s) of user_id: ${user_id} Success! \n`)
                    console.log(data)
                    res
                        .status(200)
                        .json(data)
                }
            })
    } else if (req.body.item_name) {
        let { item_name } = req.body
        return knex
            .select('*')
            .where({ item_name: item_name })
            .from('item')
            .then(data => {
                if (!data.length) {
                    console.log('Returning 404')
                    return res.status(404)
                } else {
                    console.log(`\n Get item(s) of item_name: ${item_name} Success! \n`)
                    console.log(data)
                    res
                        .status(200)
                        .json(data)
                }
            })
    } else if (req.body.quantity) {
        let { quantity } = req.body
        return knex
            .select('*')
            .where({ quantity: quantity })
            .from('item')
            .then(data => {
                if (!data.length) {
                    console.log('Returning 404')
                    return res.status(404)
                } else {
                    console.log(`\n Get item(s) with quantity: ${quantity} Success! \n`)
                    console.log(data)
                    res
                        .status(200)
                        .json(data)
                }
            })
    } else if (req.body.all) {
        return knex
            .select('*')
            .from('item')
            .then(data => {
                if (!data.length) {
                    console.log('Returning 404')
                    return res.status(404).send('Error')
                } else {
                    console.log(`\n Get all items : Success! \n`)
                    console.log(data)
                    res
                        .status(200)
                        .json(data)
                }
            })
    }
}


//Create new item and add to database
const putNewItem = async (req, res) => {


    let { user_id, item_name, description, quantity } = req.body;
    return knex("item")
        .insert({
            user_id: user_id,
            item_name: item_name,
            description: description,
            quantity: quantity
        })
        .then(() => {
            console.log(`\n Added to database: ${item_name} |  Success! \n`);
            return knex.select('*')
                .from('item')
        }).then(data => res.status(202).json(data))

}



//Modify an existing item 
const patchItem = async (req, res) => {

    console.log(req.body.item_name)
    let { item_name, new_item_name, description, new_description, quantity, new_quantity, user_id, new_user_id } = req.body;
    return knex("item")
        .where({
            item_name: item_name,
            description: description,
            user_id: user_id,
            quantity: quantity,
        })
        .modify((queryBuilder) => queryBuilder.update({ user_id: new_user_id, item_name: new_item_name, description: new_description, quantity: new_quantity }))
        .then(() => knex.select('*')
            .from('item')).then(data => res.status(202).json(data))
}



//Delete Existing Item
const deleteItem = async (req, res) => {
    console.log(req.body)
    let { id } = req.body;
    return knex("item")
        .where("id", id)
        .del()
        .then(() => knex.select('*')
            .from('item')).then(data => res.status(202).json(data))
}


//#endregion 








//#region Helper Functions ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


const getUsername = async (username) => {

    let usernameMatcher;
    return knex
        .select("username")
        .from('user')
        .where("username", username)
        .then(data => {
            console.log("INPUTED USERNAME: " + username)
            console.log("MATCHED USERNAME to database Username " + data[0].username)
            if (typeof (data.username) === undefined) {
                usernameMatcher = undefined;
                return usernameMatcher;
            } else if (data[0].username === username)
                usernameMatcher = username
            console.log('Username Match Success:' + usernameMatcher)
            return usernameMatcher;
        })
        .catch((err) => {
            console.log(err);
        })
}



const getPassword = async (password) => {

    let passwordMatcher;
    return knex
        .select("password")
        .from('user')
        .where("password", password)
        .then(data => {
            console.log("INPUTED PASSWORD: " + password)
            console.log("MATCHED PASSWORD: " + data[0].password)
            if (typeof (data.password) === undefined) {
                passwordMatcher = undefined;
                return passwordMatcher;
            } else if (data[0].password === password)
                passwordMatcher = password
            console.log('Password Match Success:' + passwordMatcher)
            return passwordMatcher;
        })
        .catch((err) => {
            console.log(err);
        })
}

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
    patchItem(req, res);
})

//Delete an existing Item by id
app.delete('/items', async function (req, res) {
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
            return res.status(403).send('Username or Password not found')
        } else
        //User Auth Success
        {
            console.log('\n User Authenticated Successfully! \n')
            req.session.authenticated = true;
            req.session.user = { username }
            req.session.cookie.path = '/login'
            return res.json(req.session)
        }
    } else
    //Inputed Username or Password Invalid Not truthy; Auth Failed
    {
        return res.status(403).json({ "msg": "Username or Password is not valid!" });
    }
}


//Create Account and add to database with PUT
const putSignUp = async (req, res) => {
    console.log(req.body)
    if (req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.createKey) {
        if (req.body.createKey === adminKey) {
            let { firstname, lastname, username, password, createKey } = req.body;
            return knex("user")
                .insert({
                    first_name: firstname,
                    last_name: lastname,
                    username: username,
                    password: password,
                })
                .then(() => {
                    return res.status(202).json({ "msg": `Added ${firstname} ${lastname} to the Inventory Box database!` })
                })
        } else { return res.status(202).json({ "msg": "The create key is incorrect! It should be: 1234 !" }) }
    } else {
        return res.status(403).json({ "msg": "Input fields are invalid! Make sure no fields are left empty!" });
    }
}



//Modify Existing Account
const patchAccount = async (req, res) => {
    if (req.body.first_name && req.body.new_first_name) {
        let { first_name, new_first_name } = req.body;
        return knex("user")
            .where("first_name", first_name)
            .modify((queryBuilder) => queryBuilder.update({ first_name: new_first_name })).then(() => { console.log(`New first name = ${new_first_name}`); return res.status(202).json({ "msg": `New first name = ${new_first_name}` }) })
    }

    else if (req.body.last_name && req.body.new_last_name) {
        let { last_name, new_last_name } = req.body;
        return knex("user")
            .where("last_name", last_name)
            .modify((queryBuilder) => queryBuilder.update({ last_name: new_last_name })).then(() => { console.log(`New last name = ${new_last_name}`); return res.status(202).json({ "msg": `New last name = ${new_last_name}` }) })
    }

    else if (req.body.username && req.body.new_username) {
        let { username, new_username } = req.body;
        return knex("user")
            .where("username", username)
            .modify((queryBuilder) => queryBuilder.update({ username: new_username })).then(() => { console.log(`New username = ${new_username}`); return res.status(202).json({ "msg": `New username = ${new_username}` }) })
    }

    else if (req.body.username && req.body.new_password) {
        let { username, new_password } = req.body;
        return knex("user")
            .where("username", username)
            .modify((queryBuilder) => queryBuilder.update({ password: new_password })).then(() => { console.log(`New password accepted! ${new_password}`); return res.status(202).json({ "msg": `New password accepted!` }) })
    } else {
        return res.status(404).json({ "msg": "Input not acceptable!" })
    }
}



//Delete Existing Account with correct username from database
const deleteAccount = async (req, res) => {
    if (req.body.username && req.body.delete === "true") {
        let { username } = req.body;
        knex("user")
            .where("username", username)
            .del()
            .then(() => {
                console.log(`Deleted user with username = ${username}`);
                return res.status(201).json({ "msg": "Delete request successful!" });
            })
    } else {
        return res.status(404).json({ "msg": "Input not acceptable!" })
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
    if (req.body.id) {
        let { id } = req.body
        knex
            .select('*')
            .where({ id: id })
            .from('item')
            .then(data => {
                if (!data.length) {
                    return res.status(404).json({ "msg": "That item does not exist!" })
                }
                console.log(`\n Get item of id: ${id} Success! \n`)
                console.log(data)
                res
                    .status(200)
                    .json(data)
            })
    } else if (req.body.user_id) {
        let { user_id } = req.body
        knex
            .select('*')
            .where({ user_id: user_id })
            .from('item')
            .then(data => {
                if (!data.length) {
                    return res.status(404).json({ "msg": "That item does not exist!" })
                }
                console.log(`\n Get item(s) of user_id: ${user_id} Success! \n`)
                console.log(data)
                res
                    .status(200)
                    .json(data)
            })
    } else if (req.body.item_name) {
        let { item_name } = req.body
        knex
            .select('*')
            .where({ item_name: item_name })
            .from('item')
            .then(data => {
                if (!data.length) {
                    return res.status(404).json({ "msg": "That item does not exist!" })
                }
                console.log(`\n Get item with item_name: ${item_name} Success! \n`)
                console.log(data)
                res
                    .status(200)
                    .json(data)
            })
    } else if (req.body.description) {
        let { description } = req.body
        knex
            .select('*')
            .where({ description: description })
            .from('item')
            .then(data => {
                if (!data.length) {
                    return res.status(404).json({ "msg": "That item does not exist!" })
                }
                console.log(`\n Get item(s) with description: ${description} Success! \n`)
                console.log(data)
                res
                    .status(200)
                    .json(data)
            })
    } else if (req.body.quantity) {
        let { quantity } = req.body
        knex
            .select('*')
            .where({ quantity: quantity })
            .from('item')
            .then(data => {
                if (!data.length) {
                    return res.status(404).json({ "msg": "That item does not exist!" })
                }
                console.log(`\n Get item(s) with quantity: ${quantity} Success! \n`)
                console.log(data)
                res
                    .status(200)
                    .json(data)
            })
    } else
    //Search Input Invalid
    {
        return res.status(404).json({ "msg": "Input not found in database!" })
    }

}


//Create new item and add to database
const putNewItem = async (req, res) => {

    if (req.body.user_id, req.body.item_name, req.body.description, req.body.quantity) {
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
                return res.status(202).json({ "msg": `Added new item: ${item_name} to the Inventory Box database!` })
            })
    } else {
        return res.status(403).json({ "msg": "Input fields are invalid! Make sure no fields are left empty!" });
    }

}



//Modify an existing item 
const patchItem = async (req, res) => {

    if (req.body.item_name && req.body.new_item_name) {
        let { item_name, new_item_name } = req.body;
        return knex("item")
            .where("item_name", item_name)
            .modify((queryBuilder) => queryBuilder.update({ item_name: new_item_name })).then(() => { console.log(`New item_name = ${new_item_name}`); return res.status(202).json({ "msg": `New item_name = ${new_item_name}` }) })
    }

    else if (req.body.description && req.body.new_description) {
        let { description, new_description } = req.body;
        return knex("item")
            .where("description", description)
            .modify((queryBuilder) => queryBuilder.update({ description: description })).then(() => { console.log(`New description = ${new_description}`); return res.status(202).json({ "msg": `New description = ${new_description}` }) })
    }


    else if (req.body.quantity && req.body.new_quantity) {
        let { quantity, new_quantity } = req.body;
        return knex("item")
            .where("quantity", quantity)
            .modify((queryBuilder) => queryBuilder.update({ quantity: new_quantity })).then(() => { console.log(`New quantity = ${new_quantity}`); return res.status(202).json({ "msg": `New quantity = ${new_quantity}` }) })
    }


    else {
        return res.status(404).json({ "msg": "Input not acceptable!" })
    }
}


//Delete Existing Item
const deleteItem = async (req, res) => {
    if (req.body.id && req.body.delete === "true") {
        let { id } = req.body;
        knex("item")
            .where("id", id)
            .del()
            .then(() => {
                console.log(`Deleted item with id = ${id}`);
                return res.status(201).json({ "msg": "Delete item request successful!" });
            })
    } else {
        return res.status(404).json({ "msg": "Input not acceptable!" })
    }

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

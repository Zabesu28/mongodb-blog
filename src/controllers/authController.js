const User = require('../models/User');
const bcrypt = require('bcrypt')

module.exports = class AuthController {
    static register (req, res) {
        res.render('register')
    }

    static async storeUser (req, res) {
        console.log("New User account request ", req.body)
        try {
            const {name, email, password} = req.body
            const saltRounds = 10
            await User.create({
                name,
                email,
                password: await bcrypt.hash( password, saltRounds)
            })
            res.redirect('/login')
        } catch (error) {
            console.log("Error creating new user ", error)
        }
    }

    static login (req, res){
        res.render('login')
    }

    static async signInUser(req, res){
        const {email, password} = req.body
        console.log("Log in attempt for ", email)
        try {
            const user = await User.findOne({email}).exec()
            if (!user){
                req.flash('error', 'Utilisateur inexistant: ', email)
                return res.redirect('/login')
            }
            console.log("Found user ", user.name, " in database")
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword){
                console.log("Password is valid ", validPassword)
                req.flash('error', 'Mot de passe invalide')
                return res.redirect('/login')
            }
            console.log("User ", user.name, user.id, " successfully logged in")
            req.session.user = {
                id: user.id,
                name: user.name,
                email
            }
            res.redirect('/list')
        } catch (error) {
            console.log("Error trying to sign in user ", email, error)
        }

    }

    static logoutUser(req, res){
        req.session.user = null;
        res.redirect('/login')
    }
}
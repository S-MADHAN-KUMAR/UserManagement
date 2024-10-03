const checkSession = async (req, res, next) => {
    try {
        if (req.session.user) {
            next()
        }
        else {
            res.redirect('/user/login')
        }
    }
    catch (err) {
        console.log(err)
    }
}

const isLogin = async (req, res, next) => {


    try {
        if (req.session.user) {
            res.redirect('/user/home')
        }
        else {
            next()
        }
    }
    catch (err) {
        console.log(err)
    }

}


module.exports = { checkSession, isLogin }
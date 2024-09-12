export const login = async (req, res, next) => {
    try{
        return res.json({
            success: true,
            message: 'Login API works!!!'
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const register = async (req, res, next) => {
    try{
        return res.json({
            success: true,
            message: 'Register API works!!!'
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const refresh = async (req, res, next) => {
    try{
        return res.json({
            success: true,
            message: 'Refresh API works!!!'
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const logout = async (req, res, next) => {
    try{
        return res.json({
            success: true,
            message: 'Logout API works!!!'
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}
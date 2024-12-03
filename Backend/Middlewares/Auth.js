const isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const isUser = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (req.user.role !== 'user' && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. User privileges required.'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const hasRole = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Insufficient privileges.'
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };
};

module.exports = {
    isAdmin,
    isUser,
    hasRole
};
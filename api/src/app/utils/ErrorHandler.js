class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 500;
        this.name = this.constructor.name;
    }

    toJSON() {
        return {
            error: {
                status: this.status,
                message: this.message,
            },
        };
    }
}

class BadRequestError extends CustomError {
    constructor(message) {
        super(message || 'Bad Request', 400);
    }
}

class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message || 'Unauthorized', 401);
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message || 'Not Found', 404);
    }
}

class InternalServerError extends CustomError {
    constructor(message) {
        super(message || 'Internal Server Error', 500);
    }
}

function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        return res.status(err.status).json(err.toJSON());
    }

    console.error(err.stack);
    res.status(500).json({
        error: {
            status: 500,
            message: 'Internal Server Error',
        },
    });
}

module.exports = {
    CustomError,
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    InternalServerError,
    errorHandler,
};

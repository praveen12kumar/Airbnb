export interface AppError extends Error {
    statusCode: number;
}

export class InternalServerError extends Error implements AppError {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 500;
        this.name = 'InternalServerError';
    }
}

export class BadRequestError extends Error implements AppError {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 400;
        this.name = 'BadRequestError';
    }
}

export class NotFoundError extends Error implements AppError {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 404;
        this.name = 'NotFoundError';
    }
}

export class UnauthorizedError extends Error implements AppError {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 401;
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends Error implements AppError {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 403;
        this.name = 'ForbiddenError';
    }
}

export class ConflictError extends Error implements AppError {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 409;
        this.name = 'ConflictError';
    }
}

export class NotImplementedError extends Error implements AppError {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 501;
        this.name = 'NotImplementedError';
    }
}

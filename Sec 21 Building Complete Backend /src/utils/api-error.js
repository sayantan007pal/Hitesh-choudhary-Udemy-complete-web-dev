class ApiError extends Error{
    constructor(statusCode, message = "Something went wrong", stack= '', error=[]){
        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.sucess = false,
        this .error = error
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}
export {ApiError}
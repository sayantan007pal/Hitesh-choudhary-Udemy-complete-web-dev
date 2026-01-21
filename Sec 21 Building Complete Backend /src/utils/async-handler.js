const asyncHandler = (statusCompletion )=>{
    return (req , res , next)=>{
        Promise
        .resolve(statusCompletion(req, res, next))
        .catch((err)=> next(err))


    }
}
export {asyncHandler}
const RedisVerifierMiddleware = (req, res, next) => {
	if (!req.session) {
		return next(new Error('Redis Session Not Ready'))
	}
	next()
}

export default RedisVerifierMiddleware

module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "default", // default
        expiresIn: "1d" // tempo de expiração 1d -> 1 dia
    }
}
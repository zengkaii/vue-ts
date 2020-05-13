module.exports = (config) => {
    const profileName = `./profiles/${config.profile ? `profile-${config.profile}.js` : 'default.js'}`
    const profile = require(profileName)
    return profile
}
const validatePassword = function(password){
    const regex = new RegExp(/^(?=.*\d)(?=.*[A-Z]).{8,20}$/);
    return regex.test(password);
}
module.exports.validatePassword = validatePassword;
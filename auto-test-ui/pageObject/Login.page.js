class Login {
    get $email () { return $('[name="email"]'); }
    get $password () { return $('[name="password"]'); }
    get $submit () { return $('button=Login'); }

    login ({ email, password }) {
        this.$email.setValue(email);
        this.$password.setValue(password);

        this.$submit.click();
    }
}

module.exports = Login;

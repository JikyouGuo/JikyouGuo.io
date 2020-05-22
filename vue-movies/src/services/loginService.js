export default {
    async login(loginId, loginPwd) {
        return new Promise(resolve => {
            if (loginId === "admin" && loginPwd === "123") {
                resolve({
                    loginId,
                    name: "Super Manager"
                });
            } else {
                resolve(null);
            }
        });
    }
};

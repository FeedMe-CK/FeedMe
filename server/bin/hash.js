const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync('12345678', salt);

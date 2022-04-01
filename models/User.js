const mongoose = require('mongoose');
const {Schema} = mongoose;
const jwt = require('njwt');

const passportLocalMongoose = require("passport-local-mongoose");
const keys = require("../config/keys");

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const userSchema = new Schema({
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    authStrategy: {
        type: String,
        default: "local",
    },
    refreshToken: {
        type: [Session],
    },
    email: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    password: String,
    userId: String,
    credits: {type: Number, default: 0},
    profileInfo: {
        PWZNumber: {type: String, default: ""},
        specializations: {type: String, default: ""},
        city: {type: String, default: ""},
        availability: {type: String, default: ""}
    }
});

//Remove refreshToken from the response
userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
});

userSchema.plugin(passportLocalMongoose);

userSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, keys.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token, //user model having tokens array where generated token are stored when user sign in and deleted when user sign out
        'tokens.access': 'auth'
    });
};

mongoose.model('users', userSchema);


const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")
const {
    EMAIL_UNIQUE_ERROR, PLEASE_PROVIDE_EMAIL, requiredError, minLengthError,
} = require("../constants/messages/messages");
const crypto = require("crypto")
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, requiredError("Name")],
    },
    lastname: {
        type: String,
        required: [true, requiredError("Lastname")],
    },
    email: {
        type: String,
        required: [true, requiredError("Email")],
        unique: [true, EMAIL_UNIQUE_ERROR],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, PLEASE_PROVIDE_EMAIL],
    },
    username: {
        type: String,
        required: [false],
    },
    password: {
        type: String,
        minlength: [6, minLengthError("Password", 6)],
        required: [true, requiredError("Password")],
        select: false,
    },
    profile_img: {
        type: String,
        required: [false, requiredError("Profile Image")],
    },
    phone: String,
    role: {
        type: String,
        default: "user"
    },
    lang: {
        type: String,
        default: "tr"
    },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Products",
        },
    ],
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true
                },
                size: {
                    type: String,
                    required: false
                }
            }
        ]
    },
    orders: [
        {
            orderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Orders",
                required: true,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String
    },
    verifyAccountToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
},{ versionKey: false })

UserSchema.methods.getResetPasswordTokenFromUser = function () {
    const randomHexString = crypto.randomBytes(15).toString("hex")
    const {RESET_PASSWORD_EXPIRE} = process.env
    const resetPasswordToken = crypto
        .createHash("SHA256")
        .update(randomHexString)
        .digest("hex");
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);
    return resetPasswordToken
};

UserSchema.methods.addToCart = async function (cartItem) {
    const index = this.cart.items.findIndex(ci => {
        return ci.productId.toString() === cartItem.productId.toString();
    })
    const updatedCartItems = [...this.cart.items]
    let itemQuantity = 1;

    if (index >= 0) {
        itemQuantity = cartItem.quantity || this.cart.items[index].quantity + 1;
        updatedCartItems[index].quantity = itemQuantity;
    } else {
        updatedCartItems.push({
            productId: cartItem.productId,
            size: (cartItem.size || ""),
            quantity: (cartItem.quantity || itemQuantity)
        })
    }
    this.cart = {
        items: updatedCartItems,
    }
    await this.save();
    return this.cart
}

UserSchema.methods.removeFromCart = async function (cartItem) {
    this.cart = {
        items: this.cart.items.filter(it => it._id !== cartItem._id),
    }
    await this.save();
    return this.cart
}

UserSchema.methods.generateJwtFromUser = function () {
    const {JWT_SECRET_KEY} = process.env;
    const payload = {
        sub: this._id,
        name: this.name,
        iat: Math.floor(Math.random() * 1000)
    };
    return jwt.sign(payload, JWT_SECRET_KEY);
};

UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("Users", UserSchema);
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) { //used a modified version of the regex from module 17 gist, included Capital letter params
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
                },
                message: "Please enter a valid email"
            },
        },

        thoughts:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },

    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//virtual called `friendCount` that retreives the length of a user's `friends` array field on query
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
//use userSchema to make User model
const User = model('User', userSchema);

module.exports = User
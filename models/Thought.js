const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlenght: 280,
        },

        createdAt:{
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString(), //getter method to format timestamp on query
        },

        username:{ //<<<<<,user that created this thought
            type: String,  
            required: true,
        },

        reactions:[reactionSchema], //reactions are like replies in this instance
    },

    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought',thoughtSchema)

module.exports = Thought;
    

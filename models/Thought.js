const { Schema, model, Types } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: 'Reaction is Required',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Username is Required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        toJSON: {
            getters: true
        },
    });

    const thoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: 'Thought is required',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: 'Username is Required'
        },
        reactions: [reactionSchema]
    },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            
            id: false
        }
    );

    thoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
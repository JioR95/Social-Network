const {Schema, model} = require('mongoose');
const Thought = require('./Thought');

const UserSchema = new Schema(
    {
        username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter email."
    },
    required: [true, "Email required"]
  },
  thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
  ],
  friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  ]
},

{
    toJSON: {
        virtuals:true,
        geters:true
    },
    id:false
});

UserSchema.virtual('friendcount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
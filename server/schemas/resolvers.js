const { User, Poem } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
               const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('thoughts')
                .populate('friends');

                return userData; 
            }

            throw new AuthenticationError('Not logged in')
            
        },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('poems')
        .populate('friends')
    },
    poems: async (parent, { username }) => {
      const params = username ? { username}: {}
      return Poem.find(params).sort({ createdAt: -1})
    },
    poem: async (parent, { _id }) => {
      return Poem.findOne({ _id })
    } 
  },
  Mutation: { // TODO: pass in third argument "context" and wrap the mutations in an if statement
    addUser: async(parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)

      return { token, user }
  },
  login: async(parent, { email, password}) => {
      const user = await User.findOne({ email })

      if (!user) {
          throw new AuthenticationError('Incorrect credentials')
      }

      const correctPw = await user.isCorrectPassword(password)

      if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials')
      }

      const token = signToken(user)
      return { token, user }
  },
    addPoem: async (parent, args) => {
      const poem = await Poem.create({ ...args, username: 'tester'}) // hardcoded with local value

      await User.findByIdAndUpdate(
        {_id: '633b2df2e989704ae155ed46' }, // hardcoded with local value
        {$push: { poems: poem._id} },
        { new: true }
      )

      return poem
    },
    addRiff: async (parent, { poemId, riffBody }) => {
      const updatedPoem = await Poem.findOneAndUpdate(
        {_id: poemId },
        { $push: { riffs: { riffBody, username: 'tester'}}},
        { new: true }
      )

      return updatedPoem
    },
    addFriend: async ( parent, { friendId }) => {
      const updatedUser = await User.findOneAndUpdate(
        {_id: '633b2df2e989704ae155ed46'},
        { $addToSet: { friends: friendId }},
        { new: true }
      ).populate('friends')

      return updatedUser
    }
  }
}

module.exports = resolvers

const { User, Poem } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
               const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('poems')

                return userData; 
            }

            throw new AuthenticationError('Not logged in')
            
        },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('poems')
    },
    poems: async (parent, { username }) => {
      const params = username ? { username }: {}
      return Poem.find(params).sort({ createdAt: -1})
    },
    poem: async (parent, { _id }) => {
      return Poem.findOne({ _id })
    } 
  },
  Mutation: { 
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
    addPoem: async (parent, args, context) => {
      if (context.user) {
        const poem = await Poem.create({ ...args, username: context.user.username}) 

        await User.findByIdAndUpdate(
          {_id: context.user._id },
          {$push: { poems: poem._id} },
          { new: true }
        )
  
        return poem
      }

      throw new AuthenticationError('You must be logged in!')
      
    },
    addRiff: async (parent, { poemId, riffBody }, context) => {
      if (context.user) {
        const updatedPoem = await Poem.findOneAndUpdate(
          {_id: poemId },
          { $push: { riffs: { riffBody, username: context.user.username}}},
          { new: true }
        )
  
        return updatedPoem
      }
      
      throw new AuthenticationError('You must be logged in!')
    }
  }
}

module.exports = resolvers

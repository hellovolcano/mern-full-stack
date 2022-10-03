const { User, Poem } = require('../models')

const resolvers = {
  Query: {
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
    addUser: async (parent, args) => {  
      const user = await User.create(args)

      return user 
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

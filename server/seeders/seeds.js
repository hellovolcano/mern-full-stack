const db = require('../config/connection')
const { Poem, User } = require('../models')


const userSeeds = [
    {
        "username": "CarlSandburg",
        "email": "carlsandburg@test.com",
        "password": "pw123"
    },
    {
        "username":"Anonymous",
        "email":"anonymous@test.com",
        "password": "pw123"
    },
    {
        "username": "ChristinaRossetti",
        "email": "christinarossetti@test.com",
        "password": "pw123"
    },
    {
        "username": "ModernMasaoka",
        "email": "modernmasaoka@test.com",
        "password": "pw123"
    },
    {
        "username": "CoupletCoder",
        "email": "coupletcoder@test.com",
        "password": "pw123"
    }
]

const poemSeeds = ["I spot the hills With yellow balls in autumn. I light the prairie cornfields Orange and tawny gold clusters And I am called pumpkins. On the last of October When dusk is fallen Children join hands And circle round me Singing ghost songs And love to the harvest moon; I am a jack-o'-lantern With terrible teeth And the children know I am fooling.",
    "White sheep, white sheep, On a blue hill, When the wind stops, You all stand still. When the wind blows, You walk away slow. White sheep, white sheep, Where do you go?",
    "Who has seen the wind? Neither I nor you. But when the leaves hang trembling, The wind is passing through. Who has seen the wind? Neither you nor I. But when the trees bow down their heads, The wind is passing by." ,
    "Crashing waves and spray; no rashguard means you rash hard; your middle, a sunset",
    "JavaScript gives and JavaScript takes away, The coding syntax I must obey"];

db.once('open', async () => {
    await User.deleteMany({})
    await Poem.deleteMany({})

    const createdUsers = await User.collection.insertMany(userSeeds)

    for (let i = 0; i < poemSeeds.length; i++) {
        // find a random user to make the author of each poem
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        
        // get the username and id for that user
        const { username, _id: userId } = createdUsers.ops[randomUserIndex];

        // for sure reason, I'm getting errors when I do this inside the jsx, so creating this here
        const poemText = poemSeeds[i]
        const createdPoem = await Poem.create({ poemText, username})

        // add the poem to this specific user
        await User.updateOne(
            { _id: userId},
            { $push: { poems: createdPoem._id}}
        )
    }


    console.log("DB Seeded!")
    process.exit(0)

})
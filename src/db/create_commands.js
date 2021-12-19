// I will keep the bulkcreate commands here, just in case
const { Drawing, Object, Drawing_Object } = require('./models.js');

const {sequelize, dbConnectionTest } = require('./connection.js');

(async() => {
  try {
    // COMMENTING THE  CREATED ONES BUT KEEPING THEM HERE FOR FUTURE REFERENCE
    
    // await Object.bulkCreate([
    //   { type: 'architecture' },
    //   { type: 'nature' },
    //   { type: 'fantasy' },
    //   { type: 'interior' },
    //   { type: 'figure' },
    //   { type: 'free' },
    //   { type: 'historical' },
    //   { type: 'face' },
    //   { type: 'view' },
    //   { type: 'urban' }
    // ])
   
    // await Drawing.bulkCreate([
    //   { url:"https://imgur.com/N12PkDc", title:"Floating house", description:"A floating house for total isoaliton" },
    //   { url:"https://imgur.com/HRhhLv6", title:"Nazgul in forest", description:"A Ringwraith looking for some halflings" },
    //   { url:"https://imgur.com/euSo8g7", title:"Cozy living room", description:"A reading room with a minimalist layout" },
    //   { url:"https://imgur.com/apkn8I7", title:"Trees and a cabin", description:"Practising sketching fast" },
    //   { url:"https://imgur.com/Ac6mSkU", title:"Did you hear that!", description:"A very stressed man who's been seeing things" },
    //   { url:"https://imgur.com/F7Jynl5", title:"Colosseum", description:"One of my very first sketches, easier to draw than it looks" },
    //   { url:"https://imgur.com/lcjqKME", title:"Empty city", description:"Perspective practice" },
    //   { url:"https://imgur.com/bZ83ZDZ", title:"Old town", description:"An old town next to the sea" },
    //   { url:"https://imgur.com/QQk5Nn1", title:"Crop signs", description:"Inspire by the movie \"Signs\"" },
    //   { url:"https://imgur.com/oZE1t0n", title:"Yurei", description:"Yurei wandering the earth" },
    //   { url:"https://imgur.com/1rWLSea", title:"Forest house", description:"A modern forest house supported by metal beams" },
    //   { url:"https://imgur.com/6z2R7Fa", title:"Country house", description:"A country house with a badly planned addition" },
    //   { url:"https://imgur.com/Qoi4kFD", title:"Japanese inspired house", description:"A house design inspired by the old Japanese architecture" },
    //   { url:"https://imgur.com/ffFSMJJ", title:"Modern suburban house", description:"A suburban house design with wood and metal additions" },
    //   { url:"https://imgur.com/XOrjhSz", title:"Spooky house", description:"An abandoned house design for halloween" },
    //   { url:"https://imgur.com/topbmO8", title:"Fisher's cabin", description:"A solitary fisher's house" },
    //   { url:"https://imgur.com/i7XYuUq", title:"Village house", description:"A well kept home" },
    //   { url:"https://imgur.com/yXCHxT9", title:"Italian modern house", description:"Drawing of a house in rural Milan" },
    //   { url:"https://imgur.com/G8b686u", title:"Modern house sketch", description:"A simple sketch for a modern house" },
    //   { url:"https://imgur.com/oUMmbZy", title:"Hidden cabin", description:"Wooden cabin hideout" },
    //   { url:"https://imgur.com/NylKaW4", title:"Stone house", description:"Sketch for a stone house" },
    //   { url:"https://imgur.com/o2X51bg", title:"Figures", description:"Started learning how to draw figures" },
    //   { url:"https://imgur.com/HZ0OgLl", title:"They are watching!", description:"Unknown creatures are watching your cabin" },
    //   { url:"https://imgur.com/495uIpx", title:"Forest goddess", description:"She preserves the nature" },
    //   { url:"https://imgur.com/9FKZjPs", title:"Cubes", description:"I practiced shadows and perspective here mostly" },
    //   { url:"https://imgur.com/8x9ou9r", title:"Spanish stone house", description:"A stone house sketch inspired by a hill house in Spain" },
    //   { url:"https://imgur.com/wHzXgiR", title:"Curious girl", description:"A Junji Ito inspired doodle" },
    //   { url:"https://imgur.com/0jTSsYu", title:"Haunted stone mansion", description:"A stone mansion that's apparently haunted, spooky" },
    //   { url:"https://imgur.com/1keU8pt", title:"Small suburban house", description:"A small suburban house to enjoy the good weather" },
    //   { url:"https://imgur.com/Zin2SHM", title:"Korean house group", description:"A sketch for a Korean inspired group of small cabins" },
    //   { url:"https://imgur.com/0luy6tr", title:"My view", description:"Drew what I saw out of my window" },
    //   { url:"https://imgur.com/Lj0xW43", title:"Spring Heeled Jack", description:"A demon that haunted London" },
    //   { url:"https://imgur.com/S3vHtcd", title:"SCP-001 Gate Keeper", description:"Inspired by the entity SCP Organization entries" },
    //   { url:"https://imgur.com/12sHRIg", title:"Jack vs Aku", description:"First fight between Aku and Samurai Jack" },
    //   { url:"https://imgur.com/1QJTapP", title:"Interior Japanese house", description:"Entrance / living area  of a Japanese inspired house" },
    //   { url:"https://imgur.com/cJkUTmA", title:"Small pool house", description:"A minimalistic house design with a pool" },
    //   { url:"https://imgur.com/qLy54Pd", title:"Simple modern pool house", description:"Simple sketch of a modern house in the country" },
    //   { url:"https://imgur.com/c4pBrUy", title:"Forest cabins", description:"Triangular wooden cabins inspred by traditional forest cabin" },
    //   { url:"https://imgur.com/MICAWX8", title:"Futuristic lake house", description:"Simple lake house sketch" },
    //   { url:"https://imgur.com/dZGXkVC", title:"Hill house", description:"Inspiration came from a house I saw in Antalya" },
    //   { url:"https://imgur.com/4lSzYRA", title:"Treasure hunter", description:"An older gentelman looking for some bounty" },
    //   { url:"https://imgur.com/uG7qUni", title:"Modern vacation home", description:"A vacation home by the sea" },
    //   { url:"https://imgur.com/XO6N9OS", title:"Sea creature", description:"A skecth for a sea creature, inpired by H.P.Lovecraft's short story \"The Shadow over Innsmouth\"" },
    //   { url:"https://imgur.com/wJEI1Fm", title:"Sino-Thai building", description:"A Sino-Thai government building in Thailand" },
    //   { url:"https://imgur.com/QBPRybF", title:"Old town Porto", description:"Group of houses in old town Porto" },
    //   { url:"https://imgur.com/V5Nbmzl", title:"Modern mountain hosue", description:"A mountain house sketch that would withstand strong winds" },
    //   { url:"https://imgur.com/DvleWdb", title:"Wanderer Pan", description:"Inspired by the Greek forest god Pan" },
    //   { url:"https://imgur.com/wv8h1WH", title:"Tree habitat", description:"Part of a neighborhood build on top of a tree" }
    // ])
  } catch (error) {
    console.log("didn't work ==>", error)
  }



})();
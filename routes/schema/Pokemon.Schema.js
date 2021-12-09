const Schema = require('mongoose').Schema;

exports.PokemonSchema = new Schema({
    name: String,
    health: {type: Number},
    type: String,
    owner: String,
// this explicitly declares what collection we're using
}, { collection : 'pokemons' });
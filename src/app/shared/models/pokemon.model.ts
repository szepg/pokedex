export interface Pokemon {
    // id: number,
    name: string,
    url: string,
}

export interface AllPokemon {
    count: number,
    results: Pokemon[]
}
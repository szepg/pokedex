export interface AllPokemonWrapper {
    next: string,
    results: Pokemon[]
}

export interface PokemonBasicData {
    // name: string,
    // url: string,
}


export interface Pokemon {
    id: number,
    name: string,
    image: string;
    stats: Stats[],
    url: ''
}

export interface Stats {
    base_stat: number,
    stat: {
        name: string;
    }
}
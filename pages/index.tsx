import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { Button } from "@nextui-org/react";
import { GetStaticProps } from "next";

interface Props {
  pokemons: SmallPokemon[];
}

export default function HomePage({ pokemons }: Props) {
  return (
    <Layout title="Listado de pokemons">
      <ul>
        {
          pokemons.map(({ id, name }) => (
            <li key={id}>#{id} - {name}</li>
          ))
        }
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPi/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }));

  return {
    props: {
      pokemons
    },
  }
};

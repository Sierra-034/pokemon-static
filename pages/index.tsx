import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { Button } from "@nextui-org/react";
import { NextPage, GetStaticProps } from "next";

export default function HomePage(props) {
  console.log(props);
  return (
    <Layout title="Listado de pokemons">
      <Button color='gradient'>
        Hola mundo
      </Button>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get('/pokemon?limit=151');
  return {
    props: {
      pokemons: data.results,
    },
  }
};

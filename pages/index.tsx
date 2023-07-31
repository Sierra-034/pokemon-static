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
  console.log('Hola mundo');
  return {
    props: {
      name: 'Samuel'
    },
  }
};

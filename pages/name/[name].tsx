import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Pokemon, PokemonListResponse } from "@/interfaces";
import { pokeApi } from "@/api";
import { useEffect, useState } from "react";
import { localFavorites } from "@/utils";
import confetti from "canvas-confetti";
import { Layout } from "@/components/layouts";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
    const [isInfavorites, setIsInFavorites] = useState(false);
    
    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInfavorites);
        if (isInfavorites) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        });
    };

    useEffect(() => {
        console.log(localFavorites.existsInFavorites(pokemon.id));
        setIsInFavorites(localFavorites.existsInFavorites(pokemon.id));
    }, []);

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || './no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform="capitalize">{pokemon.name}</Text>
                            <Button
                                color='gradient'
                                ghost={!isInfavorites}
                                onPress={onToggleFavorite}
                            >
                                {isInfavorites ? 'En favoritos' : 'Guardar en favoritos'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container display="flex" direction="row">
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonNames = data.results.map(pokemon => ({ params: { name: pokemon.name } }));
    return {
        paths: pokemonNames,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string }
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);
    return {
        props: {
            pokemon: {
                id: data.id,
                name: data.name,
                sprites: data.sprites,
            }
        }
    };
};

export default PokemonByNamePage;

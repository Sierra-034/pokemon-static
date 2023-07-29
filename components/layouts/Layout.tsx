import { FC, ReactNode } from 'react';
import Head from "next/head";

interface Props {
    title?: string;
    children?: ReactNode;
};

export const Layout: FC<Props> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{ title || 'PokemonApp'}</title>
                <meta name="author" content="Samuel Gómez" />
                <meta name="description" content={`Información sobre el pokemón ${title}`} />
                <meta name="keywords" content={`${title}, pokemón, pokedex`} />
            </Head>

            {/* Navbar */}

            <main>
                { children }
            </main>
        </>
    );
};

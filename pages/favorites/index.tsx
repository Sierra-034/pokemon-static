import { Layout } from "@/components/layouts";
import { NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import { useEffect, useState } from "react";

const FavoritesPage = () => {
    const [favoritePokemons, setFavoritePokemos] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemos(localFavorites.pokemons());
    }, []);
    
    return (
        <Layout title="Pokémons - Favoritos">
            <NoFavorites/>
        </Layout>
    )
};

export default FavoritesPage;

import React from "react";
import { Badge } from "@/components/ui/badge";
import { CardContent, Card } from "@/components/ui/card";
import { useGetPokemonByNameQuery } from "../store/services/pokeapi";
import typeColors from "@/lib/type-colors";

const PokemonListItem = React.forwardRef(
  ({ name }: { name: string }, ref: React.Ref<HTMLDivElement>) => {
    const { data, error, isLoading } = useGetPokemonByNameQuery(name);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading Item</div>;

    return (
      data && (
        <Card ref={ref} className="w-full">
          <CardContent className="flex flex-row items-center p-4">
            <img src={data.sprites.front_default} alt={data.name} />
            <div className="ml-4 flex flex-col">
              <h3 className="text-md font-bold capitalize">{data.name}</h3>
              <p>#{String(data.id).padStart(4, "0")}</p>
              <div className="flex gap-2 mt-1">
                {data.types.map((type) => (
                  <Badge
                    className="capitalize"
                    style={{ backgroundColor: typeColors[type.type.name] }}
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )
    );
  }
);

export default PokemonListItem;

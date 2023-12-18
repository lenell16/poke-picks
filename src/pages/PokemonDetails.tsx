import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetPokemonByNameQuery } from "@/store/services/pokeapi";
import typeColors from "@/lib/type-colors";
import StatBar from "@/components/StatBar";
import { useParams, Link } from "react-router-dom";
import {
  decimetresToFeet,
  decimetresToMetres,
  hectogramsToPounds,
  hectogramsToKilograms,
} from "@/lib/conversions";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function PokemanDetails() {
  const params = useParams();
  const { data, error, isLoading } = useGetPokemonByNameQuery(params.pokemon!, {
    skip: !params.pokemon,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Item</div>;
  return (
    data && (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="flex flex-row items-center space-x-4">
              <img src={data.sprites.front_default} alt={data.name} />
              <div>
                <CardTitle className="capitalize">{data.name}</CardTitle>
              </div>
            </div>
            <Button variant="link" asChild>
              <Link to="/">Back to list</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="moves">Moves</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <div className="grid grid-cols-2 gap-4">
                  <h3 className="font-medium leading-none">Height</h3>
                  <p>
                    {decimetresToFeet(data.height).toFixed(2)} ft (
                    {decimetresToMetres(data.height).toFixed(2)} m)
                  </p>
                  <h3 className="font-medium leading-none">Weight</h3>
                  <p>
                    {hectogramsToPounds(data.weight).toFixed(2)} lb (
                    {hectogramsToKilograms(data.weight).toFixed(2)} kg)
                  </p>
                  <h3 className="font-medium leading-none">Types</h3>
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
                  <h3 className="font-medium leading-none">Abilities</h3>
                  <p>
                    {data.abilities
                      .map((ability) => ability.ability.name)
                      .join(", ")}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="stats">
                <div className="grid grid-cols-[auto_auto_1fr] gap-2 w-full">
                  {data.stats.map((stat) => (
                    <>
                      <p className="text-sm capitalize">{stat.stat.name}</p>
                      <p className="text-sm font-semibold">{stat.base_stat}</p>
                      <StatBar stat={stat.base_stat} />
                    </>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="moves">
                <div className="grid grid-cols-2 gap-4">
                  {data.moves.map((move) => (
                    <div className="flex flex-col">
                      <p className="text-sm capitalize">{move.move.name}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    )
  );
}

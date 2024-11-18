import cors from "@fastify/cors";
import fastify from "fastify";

const server = fastify({ logger: true });

server.register(cors, {
	origin: "*",
    // origin: ["http://localhost:3000", "http://localhost:3001"],
});

const teams = [
	{
		id: 1,
		name: "Ferrari",
	},
	{
		id: 2,
		name: "Redbull Racing",
	},
	{
		id: 3,
		name: "Mercedes",
	},
	{
		id: 4,
		name: "McLaren",
	},
	{
		id: 5,
		name: "Alpine",
	},
	{
		id: 6,
		name: "Alfa Romeo",
	},
	{
		id: 7,
		name: "AlphaTauri",
	},
	{
		id: 8,
		name: "Haas",
	},
	{
		id: 9,
		name: "Williams",
	},
	{
		id: 10,
		name: "Aston Martin",
	},
	{
		id: 11,
		name: "Lotus",
	},
];

const drives = [
	{
		id: 1,
		name: "Max Vertappen",
		team: "Redbull Racing",
	},
	{
		id: 2,
		name: "Sergio Perez",
		team: "Redbull Racing",
	},
	{
		id: 3,
		name: "Charles Leclerc",
		team: "Ferrari",
	},
	{
		id: 4,
		name: "Carlos Sainz",
		team: "Ferrari",
	},
	{
		id: 5,
		name: "Lewis Hamilton",
		team: "Mercedes",
	},
	{
		id: 6,
		name: "George Russel",
		team: "Mercedes",
	},
	{
		id: 7,
		name: "Lando Norris",
		team: "McLaren",
	},
	{
		id: 8,
		name: "Daniel Ricciardo",
		team: "McLaren",
	},
];

server.get("/teams", async (request, response) => {
	response.type("application/json").code(200);
	return { teams };
});

server.get("/drives", async (request, response) => {
	response.type("application/json").code(200);
	return { drives };
});

interface DriverParams {
	id: string;
}

server.get<{ Params: DriverParams }>(
	"/drives/:id",
	async (request, response) => {
		// const id = request.params.id;
		const id = Number.parseInt(request.params.id);

        const driver = drives.find( ( d ) => d.id === id );

        if(!driver){
            response.type("application/json").code(404);
            return { error: "Driver not found" };
        // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
            response.type("application/json").code(200);
            return { driver };
        }
	}
);

server.listen({ port: 3333 }, () => {
	console.log("Server init");
});

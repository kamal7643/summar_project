
const MongoClient = require('mongodb').MongoClient;



async function findListings(client, resultsLimit) {
    const cursor = client
        .db('api')
        .collection('players')
        .find()

    const results = await cursor.toArray();
    if (results.length > 0) {
        console.log(`Found ${results.length} listing(s):`);
        results.forEach((result, i) => {
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   email: ${result.email}`);
            console.log(`   userName: ${result.userName}`);
            console.log(`   password: ${result.password}`);
            console.log(`   playName: ${result.playName}`);
        });
    }
}


async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://kamal7643:dob7643@cluster0.fdabf.mongodb.net/api?retryWrites=true&w=majority";


    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);
        await findListings(client, 1);


    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
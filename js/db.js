const { Pool, Client } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://znvkssnflrylqq:6b96007ebf0939043c8b79b7f53b5dc9dc9105a56ee204a8fa4738aacd0c1278@ec2-54-217-245-26.eu-west-1.compute.amazonaws.com:5432/dcpdr83q965m9i";
      
const db = {}

async function runQuery(query) {
    let respons = null;
    const client = new Client({
        connectionString: connectionString,
        ssl: true
    })
   
    try {

        //wait for connection
        await client.connect()

        //wait until promise complete
        let res = await client.query(query).then(function (res) {
            //console.log(res);
            //(Here you can manipulate response)
            return res;
        }).catch(function (err) {
            console.log(err);
        });

        respons = res.rows;

    } catch (e) {
        console.log("Error");
        console.log(e);
        /*ops*/
    }

    return respons;
}

db.insert = async function(query){
    return await runQuery(query);
};

db.select = async function(query){
    return await runQuery(query);
};

db.delete = async function(query){
    //db.update(query);
    return await runQuery(query);
};

db.update = async function(query){
    return await runQuery(query);
};

module.exports = db


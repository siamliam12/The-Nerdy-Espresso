const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql://postgres.pgjdclcxlsoioxwgsmqk:dgT28iDPMtuVGt9u@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
});

client.connect()
  .then(() => {
    console.log("Connected to database successfully!");
    return client.end();
  })
  .catch(err => console.error("Connection error", err));

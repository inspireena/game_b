const rejson =require('ioredis-rejson');

/* pulls the Redis URL from .env */
// const url = process.env.REDIS_URL

/* create and open the Redis OM Client */


const client = new rejson({
  host: "redis-18803.c212.ap-south-1-1.ec2.cloud.redislabs.com",
  port: 18803,
  password: "MASw2wA9GnT6RFCYUK91Ma5bL5LETIzK",
  });

// try{
//     client.open(url)
//     console.log("connected to Redis")
// }catch{
//     console.log("failed to connect to Redis");
// }


module.exports=client;


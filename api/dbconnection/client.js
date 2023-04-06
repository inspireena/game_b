const rejson =require('ioredis-rejson');

/* pulls the Redis URL from .env */
// const url = process.env.REDIS_URL

/* create and open the Redis OM Client */


const client = new rejson({
  host: "redis-18030.c8.us-east-1-4.ec2.cloud.redislabs.com",
  port: 18030,
  password: "DTbD4hH6LWiwOZQw0UAd3D9RzDbaPUPS",
  });

// try{
//     client.open(url)
//     console.log("connected to Redis")
// }catch{
//     console.log("failed to connect to Redis");
// }


module.exports=client;


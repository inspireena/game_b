const constant={
    NODE_PORT:process.env.NODE_PORT,
    STREAMER_PORT:process.env.STREAMER_PORT,
    GAME_PORT:process.env.GAME_PORT,
    BASE_URLS:{
        NODE_URL:process.env.NODE_URL,
        STR_URL:process.env.STR_URL
    },
    MIDDLE_URL:{
        NODE_STR_MIDDLE:"strApi",
        NODE_GAME_MIDDLE:"gameApi",
        STR_MIDDLE:"streamer",
        GAME_MIDDLE:"game"
    },
    DB_URL:process.env.DB_URL,
    JWT_SECRETKEY:process.env.JWT_SECRETKEY,
}
module.exports=constant;
export const  providers={
    "local":{
        authorizationEndpoint:"http://localhost:8000/auth/token",
        logout:'http://localhost:8000/auth/revoke-token',
        client_id:"nGtfTJ6lTduENx2y7E4RmjZg3JlSLLSSbkfu20SE",
        client_secret:"Yq7C8Sfjs3beuFEneuhnmeN4bhFVCE1HbWozIBxeoqffWXch9QPeQIhtk0cf9UEzh7UgyeB8cQPmraUJ0vUNydw8Y0ZYjImAwLxoUD5crqGyQlusjfBU6tvX9bc61MhX",        
    },
    "google":{
        backend: 'google-oauth2',
        authorizationEndpoint:"https://accounts.google.com/o/oauth2/v2/auth",
        client_id:"807245382717-grbugp9mfmm3cq4set7vkln0tolocgpa.apps.googleusercontent.com",
        redirect_uri: "http://localhost:3000/callback/google",
        scope:"profile",
        response_type:"token",
        url:["response_type","client_id","redirect_uri","scope"],
    },
    "facebook":{
        backend: "facebook",
        authorizationEndpoint:"https://www.facebook.com/v3.3/dialog/oauth",
        client_id:"1245681605612682",
        redirect_uri: "http://localhost:3000/callback/facebook",
        response_type:"token",
        url:["response_type","client_id","redirect_uri"]
    },
    "twitter":{
        backend: "twitter",
        authorizationEndpoint:"https://api.twitter.com/oauth2/token",
        client_id:"bRdgArdctaAlkb0xCUfbVDOrT",
        redirect_uri: "http://localhost:3000/callback/twitter",
        response_type:"token",
        url:["response_type","client_id","redirect_uri"]
    },
  }

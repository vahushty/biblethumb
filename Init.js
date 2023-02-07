import fetch from "node-fetch";
import { prisma } from "./prismaInit.js";
export async function init() {
let initToken = await prisma.baseInit.findFirst({
    where: { id: 1},
    select: { token: true },
  });;
if(initToken === null){
  const body = {
    name: "product",
    email: "sobakingavgavgav1488@email.com",
    password: "666666", 
    notifications: false, 
  };

  const response = await fetch("https://www.abibliadigital.com.br/api/users", {
    method: "post",
    body: JSON.stringify(body),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (data.msg !== undefined) {
    console.log(data.msg);
  } else {
    initToken = data.token;
    await prisma.baseInit.create({
      data: {
        token: initToken,
      },
    });
    console.log(`We have got a new token here! ${initToken}`);
  }
}
else{
    console.log(`We have got an old token here! ${initToken.token}`)
    initToken = initToken.token
}
return initToken;
}
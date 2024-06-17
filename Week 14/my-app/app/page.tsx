import axios from "axios";

async function getDetails() {
  const res = await axios.get(
    "http://localhost:3000/api/user"
  );

  return res.data;
}

export default async function Home() {

  const userDetails = await getDetails();
  return <h1>{userDetails.name}</h1>;
}

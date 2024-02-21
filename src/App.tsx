import { useState, useEffect } from "react";
import "./App.scss";
export default function App() {
  type UserType = {
    name: string;
    age: number;
    gender: string;
    picture: string;
    email: string;
  };

  const [users, setUsers] = useState<Array<UserType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser(): Promise<void> {
    const newUsers: Array<UserType> = [];
    try {
      const response = await fetch("https://randomuser.me/api/");
      const userData = await response.json();
      console.log(userData.results);
      const userDataObject: UserType = {
        name:
          userData.results[0].name.first + " " + userData.results[0].name.last,
        age: userData.results[0].dob.age,
        gender: userData.results[0].gender,
        picture: userData.results[0].picture.large,
        email: userData.results[0].email,
      };
      newUsers.push(userDataObject);
    } catch (error) {
      console.log(error);
    }
    setUsers((prevUser) => [...prevUser, ...newUsers]);
    setLoading(false);
  }

  return (
    <>
      <h1>Ejericio consumo de api</h1>
      <section className="resume-cards">
        {loading ? (
          <h1>Cargando ...</h1>
        ) : (
          users.map((user, index) => (
            <div className="card-user" key={index}>
              <img src={user.picture} alt={user.name} />
              <span>
                <h2>{user.name}</h2>
                <p>Age: {user.age}</p>
                <p>Gender: {user.gender}</p>
                <p>Email: {user.email}</p>
              </span>
            </div>
          ))
        )}
      </section>
      <button
        id="generate-user"
        onClick={() => {
          getUser();
        }}
      >
        Añadir más usuarios
      </button>
    </>
  );
}

//funcion autoinvocada
/* (async (): Promise<void> => {
  try {
    const response = await fetch('https://catfact.ninja/facts');
    const data = await response.json();
    const catFacts = data.data;
    console.log(catFacts);
    setFact(catFacts);
  } catch (error) {
    console.log(error);
  }
})() */
/*   getImages("https://cataas.com/cat/says"); */

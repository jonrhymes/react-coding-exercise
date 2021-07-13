import React, { useState } from 'react';
import { render } from 'react-dom';
import './index.css';
import { ApolloTableQL } from 'react-tableql';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

const LAUNCHES = gql`
  query GetLaunches{
    launchesPast{
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
    }
  }
`; 

// function GetAllLaunches() {
//   const { loading, error, data } = useQuery(LAUNCHES);

//   const [searchTerm, setSearchTerm] = useState("");

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error : ${error.message}</p>;

//   return data.launchesPast.map(( {mission_name, launch_date_local, rocket}) => (
//     <div key={mission_name}>     
//             <table>
//           <thead>
//             <tr>
//               <th>Mission Name</th>
//               <th>Year</th>
//               <th>Rocket</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data && data.launchesPast.map(( {mission_name, launch_date_local, rocket}) => (
//               <tr>
//                 <td>{mission_name}</td>
//                 <td>{launch_date_local}</td>
//                 <td>{rocket.rocket_name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//     </div>
//   ));
// }


function App() {

  const { loading, error, data } = useQuery(LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : ${error.message}</p>;

  const date = new Date();
  const year = date.getFullYear();

  return (
    <div>
      <h2>The Graph SpaceX</h2>
      <form>
        <label for="filter">Search Missions: </label>
        <input 
          type="text" 
          id="filter" 
          name="filter" 
          placeholder="Enter search"
        ></input>
      </form>

      <ApolloTableQL
      pagination 
      columns={[
        'mission_name',
        {
          id: 'launch_date_local',
          label: 'Year',
          sort: function sort(data) {return data.reverse()}
        }
      ]}
      query={LAUNCHES} 
      sort/>


      {/* <GetAllLaunches /> */}
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

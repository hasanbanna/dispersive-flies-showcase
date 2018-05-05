import React, { Component } from 'react';
import ActionMenu from './components/ActionMenu';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pulvinar imperdiet dolor vel tempor. Duis maximus ante eget dui facilisis tincidunt eu sed sem. Vivamus est quam, tempus nec euismod vel, posuere non leo. Integer congue eros at lacus dapibus faucibus sed vitae diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse tempus tempus tellus sed mollis. Integer non ante lorem.</p>
        <Simulation />
        {/* <Result /> */}
        <Footer />
      </div>
    );
  }
}

// Header Component
class Header extends Component {
  render () {
    return (
      <header className="App-header">
        Protein Structure Prediction Using 2D Toy Model
      </header>
    )
  }
}

// Simulation Component 
class Simulation extends Component {
  render () {
    return (
    <div className="simulation-container">
      <canvas className="canvas" id="tutorial" width="150" height="250"></canvas>
      <ActionMenu />
    </div>    
    )    
  }
  componentDidMount() {
    let canvas = document.getElementById('tutorial');
    if(canvas.getContext){
      // var ctx = canvas.getContext('2d');
      // ctx.fillRect(25, 25, 100, 100);
      // ctx.clearRect(45, 45, 60, 60);
      // ctx.strokeRect(50, 50, 50, 50);
    }
  }
}

// Result Component

// class Result extends Component {
//   render () {
//     const pStyle = {
//       textAlign: 'center'
//     }
//     return(
//       <div className="results-container">
//         <h1 style={pStyle}>Results</h1>
//         <table>
//           <tr>
//             <th>Company</th>
//             <th>Contact</th>
//             <th>Country</th>
//           </tr>
//           <tr>
//             <td>Alfreds Futterkiste</td>
//             <td>Maria Anders</td>
//             <td>Germany</td>
//           </tr>
//           <tr>
//             <td>Centro comercial Moctezuma</td>
//             <td>Francisco Chang</td>
//             <td>Mexico</td>
//           </tr>
//           <tr>
//             <td>Ernst Handel</td>
//             <td>Roland Mendel</td>
//             <td>Austria</td>
//           </tr>
//           <tr>
//             <td>Island Trading</td>
//             <td>Helen Bennett</td>
//             <td>UK</td>
//           </tr>
//           <tr>
//             <td>Laughing Bacchus Winecellars</td>
//             <td>Yoshi Tannamuri</td>
//             <td>Canada</td>
//           </tr>
//           <tr>
//             <td>Magazzini Alimentari Riuniti</td>
//             <td>Giovanni Rovelli</td>
//             <td>Italy</td>
//           </tr>
//         </table>
//       </div>
//      ) 
//   }
// }

class Footer extends Component {
  render () {
    return (
      <div>
        Hasan Banna - 2018
      </div>
    )
  }
}
export default App;



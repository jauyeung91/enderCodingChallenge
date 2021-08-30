import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';



class App extends Component {
    
    constructor (props){
        super(props)
    
        this.state = {
            property:null,
            isLoading: true,
            lease:null,
            leaseLoaded: true,
            array: {},
        };
    }

    componentDidMount(){
        fetch('https://talent.ender.com/fe-challenge/properties',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": 'dde70fd6-b600-43cd-b1d9-33250337b31a',
            })
            
        })
        .then(response => response.json())
        .then(data => this.setState({data: data, isLoading: false}));
        
        
    }

   getLease(propId){
       this.setState({leaseLoaded:true})
       console.log("clicked")
       fetch('https://talent.ender.com/fe-challenge/properties/'+propId+'/leases',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "token": 'dde70fd6-b600-43cd-b1d9-33250337b31a',
                })
            
        }).then(response => response.json())
        .then(data => this.setState({lease:data, leaseLoaded:false}))
    
       }
       
   

    
    
   
  render() {
      const getPhone = (object)=> {
          return object[Object.keys(object)[0]].phone
      }
      const saveStart=(startDate)=> {
          
          return startDate
      }
      const renderTable = () => {
          if(!this.state.leaseLoaded && this.state.lease != null){
              return this.state.lease.map((each,index)=> (
            <tbody>
            <tr className = "tablerowdata" key= {index}>
                <td>{each.companyName}</td>
                <td>{saveStart(each.startDate)}</td>
                <td>{each.inclusiveEndDate}</td>
                <td>{each.status}</td>
                <td>{getPhone(each.contacts)}</td>
              </tr>
            </tbody>
                                                                                                                                  
                                                        
            ))}
          console.log()
          }
      
      
      
      if (this.state.isLoading && this.state.leaseLoaded){
        return <p>Loading...</p>
      }
      else {
      return (
      <div className="App">
            <div className="cards">
              {this.state.data.map((each,index)=> (
                <div className = "card" key = {index} onClick = {() =>this.getLease(each.id)}>
                    <div className = "name">{each.name} </div>
                        <div className = "row1">
                           <div className = "address">{each.address1} {each.address2}</div>
                           <div className = "baseRent">{each.baseRent}</div>
                        </div>
                        <div className = "row2">
                           <div className = "sqft">{each.sqft} sqft.</div>
                           <div className = "mo">${((parseInt((each.baseRent).replace(/[^\d.-]/g, ''))/parseInt(each.sqft))/12).toFixed(2)} sqft/mo </div>
                           <div className= "yr">${(parseInt((each.baseRent).replace(/[^\d.-]/g, ''))/parseInt(each.sqft)).toFixed(2)} sqft/yr</div>
                            
                        </div>
                    </div>
                ))}
            </div>
              
            <table className = "table">
              <thead>
              <tr className= "tablerow">
                <td>Tenant</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Lease Status</td>
                <td>Primary Contact</td>
              </tr>
              </thead>
              {renderTable()}
                                                    
            
            
            
        

              
            
              
              
            </table>
              
      </div>
    );
  }
  }
}


export default App;

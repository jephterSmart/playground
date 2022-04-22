
import React, {Component} from 'react';


const convertArray = (arr) => {
    let obj = {};
    arr.forEach(el =>{
        obj[el] = [];
    })
    return obj;
}

class AssemblyLine extends Component {
    constructor(props){
        super(props);
        this.state ={
            inputValue : '',
            Ideas:[],
            "Development":[],
            "Testing":[],
            "Deploy":[]
        }
    }
    componentDidMount(){
        this.setState(prevState => {
            let sta = convertArray(this.props.stages);
            sta.inputValue = prevState.inputValue;
            return prevState;
        })
    }
    changeHandler = ({target}) => {
        this.setState({inputValue:target.value});
        
    }
    keyPressHandler = (e) => {
        
        if(e.code === 'Enter' || e.keyCode === 13){
            this.setState(prevState => {
                let newState = JSON.parse(JSON.stringify(prevState));
                newState.Ideas.unshift(prevState.inputValue);
                newState.inputValue = '';
                return newState;
            })
            
        }
    }
    
    move = (direction,stage,item) => {
        const stages = this.props.stages;
        const ind = stages.findIndex(el => el === stage);//which of the stages are we in
    
        //i.e move right and if it is at the end of the stages remove it,
        //also if we move left and it is at the first stage, then we know we've to dop it.
        if((direction > 0 && (ind === stages.length - 1)) || (
            direction < 0 && (ind === 0)) ){
        
                this.setState(prevState => {
                    const newState = JSON.parse(JSON.stringify(prevState));
                    const indexOfItem = newState[stage].findIndex(el => el === item) ;
                    newState[stage].splice(indexOfItem,1);
                     return newState;
                });
           
           
        }
        //otherwise just move in any direction
        else{
            //if not, we've not gotten to the end of the last stage. So we move it
             this.setState(prevState => {
                 const newState = JSON.parse(JSON.stringify(prevState));
                 const indexOfItem = newState[stage].findIndex(el => el === item) ;
                 const nextStage = stages[ind+ (direction>0 ? 1 : -1)];
                 if(direction>0)
                 newState[nextStage].unshift(item);
                 else 
                 newState[nextStage].push(item);
                 newState[stage].splice(indexOfItem,1);
                 return newState;
                 
             })
        }
        
    }
    
    clickHandler= (e,stage,item,fromCtx) => {
        if(fromCtx){
            e.preventDefault(); 
            return;
        }
      
    if(e.altKey || e.which === 3 || e.button === 2){
        //This means we right-click our mouse
      this.move(1,stage,item)
    }
    if(e.ctrlKey || e.button === 0 ||  e.which === 1){
        //This means we left-click our mouse
        this.move(-1,stage,item);
    }
      return false;
    }
    
    render(){
        const stages = this.props.stages;
        return(
            <div style={{width: '90%', margin:'auto'}}>
            <input onChange={this.changeHandler} 
            style={{padding:'12px',fontSize: '18px',display:'block',marginBottom:'16px'}}
            onKeyPress={this.keyPressHandler} value={this.state.inputValue}/>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between'}}>
                {
                    stages.map(stage => (
                        <div style={{width: `calc(90% / ${stages.length})`}} key={stage}>
                            <div>{stage}</div>
                            {this.state[stage].map(item => (
                                <button key={item} 
                                style={{display:'block',width:'100%',
                                marginTop:16, padding:'8px',cursor:'pointer'}} 
                                onMouseDown={(e) => this.clickHandler(e,stage,item)}
                                onContextMenu={(e) => this.clickHandler(e,stage,item,true)}
                                >
                                    {item} 
                                </button>
                            ))}
                            </div>)
                    )
                }
            </div>
            </div>
        )
    }
}

export default AssemblyLine;
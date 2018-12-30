import React, {Component} from 'react';
import flv from 'flv.js';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';

class StreamShow extends Component{
    constructor(props){
        super(props);
        this.videoRef = React.createRef();
    }
    componentDidMount(){
        const {id} = this.props.match.params
        this.props.fetchStream(id);
        try {
            this.buildPlayer();    
        } catch (error) { 
            console.log(error);
        }
        
    }

    componentDidUpdate(){
        this.buildPlayer();
    }

    componentWillUnmount(){
        this.player.destroy();
    }

    buildPlayer = () =>{
        if(this.player || !this.props.stream){
            return;
        }
        const {id} = this.props.match.params
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load();

    }
    renderStream = () =>{
        if(!this.props.stream){
            return <>Loading stream...</>
        }
        const {stream} = this.props;
        return (
            <div className="item video">
                    <video ref={this.videoRef} style={{width: '70%'}} controls/>
                    <div className="content">
                        {stream.title}
                    </div>
                    <div className="description">
                        {stream.description}
                    </div>
            </div>
        )
    }
    render(){
        return(
            <>{this.renderStream()}</>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    const streamId = ownProps.match.params.id;
    return {stream: state.streams[streamId]}
}
export default connect(mapStateToProps, {fetchStream})(StreamShow);
import React, {Component} from 'react';
import flv from 'flv.js';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';
import '../assets/css/StreamShow.css';

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
            // console.log(error);
            // this error will log during testing
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
        const {stream} = this.props;
        if(!stream){
            return (
                <div className='donut-parent'>
                    <div className='donut'></div> 
                </div>
            )
        }
        return (
            <div className="item StreamShow">
                    <video className='video' ref={this.videoRef} controls/>
                    <div className="content">
                        <strong>Stream Title: </strong> {stream.title}
                    </div>
                    <div className="description">
                        <strong>Stream description:</strong> {stream.description}
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
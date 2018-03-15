import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/index'

const Auth = (props) => {
    

    return(
        <props.Layout {...props} style={{ height: '100vh', width: '100%', margin: 'auto', background: '#55555522'}}/>
    )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { login })(Auth);
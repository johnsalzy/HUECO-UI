// Import needed Libs
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
    Button,
} from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//Import Screens/Components/Styles
// import {view_style, text_input, buttons} from '../assets/styles/styles';

//Redux imports
import {connect} from 'react-redux';
// import { loginUserNormal } from '../redux/actions'

// All for forms
import t from 'tcomb-form-native';
const Form = t.form.Form;
const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});
const User = t.struct({
  email: Email,
  firstName: t.String,
  lastName: t.String,
  username: t.String,
  location: t.String,
  password: t.String,
//   private: t.Boolean,
  terms: t.Boolean
});
const formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {
        marginBottom: 10
      },
    },
    controlLabel: {
      normal: {
        color: 'blue',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      },
      // the style applied when a validation error occours
      error: {
        color: 'red',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      }
    }
}
const options = {
    fields: {
      email: {
        error: 'Enter Email'
      },
      firstName: {
          label: "First Name"
      },
      lastName: {
        label: "Last Name"
    },
      terms: {
        label: 'Agree to Terms',
      },
    },
    stylesheet: formStyles,
};

const mapStateToProps = state => (
    {
    login: state.login
    }
)


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible,
            login: this.props.login,
        };
    }

    closeModal = () => {
        this.props.closeModal()
    }
    handleSubmit = () => {
        const value = this._form.getValue();
        alert('value: '+ JSON.stringify(value));
    }
    render() {
        let { modalVisible } = this.state;
        return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <TouchableOpacity onPress={() => this.closeModal() } >
                        <TouchableWithoutFeedback>
                            <View style={styles.container}>
                                <ScrollView>
                                    <TouchableOpacity onPress={() => this.closeModal() }>
                                        <Text style={styles.modalLeave}>X</Text>
                                    </TouchableOpacity>
                                    <View style={styles.containerForm}>
                                        <View>
                                            <Form 
                                            ref={c => this._form = c}
                                            type={User} 
                                            options={options}
                                            />
                                            <Button
                                            title="Sign Up!"
                                            onPress={() => this.handleSubmit()}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                                
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            
        );
    }
}
export default connect(mapStateToProps)(Register);


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        width: '90%', 
        height: '90%', 
        marginTop: windowHeight*.05,
        marginLeft: windowWidth*.05,
        padding: 10,
        borderRadius: 4,
    },
    modalLeave: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 'auto',
        color: 'red',
    },
    containerForm: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
      },
});
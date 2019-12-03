import React, { Component } from 'react'
import { Conversation, Select, Question, Option } from '../Conversation/src/index';

import './Form.scss'

export default class ConversationalForm extends Component {
  state = {

  }

  setValue = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  sendData = (data) => {
    var database = firebase.database();

    let key = database.ref().child('requests').push().key

    database.ref(`requests/${key}`).set(data)

    // Send email
    let to = 'ajose.erazo@gmail.com';
    let from = 'solicitudes@regaloenvenezuela.com';
    let subject = 'Tienes una nueva solicitud de regalo'
    let body = `<h1>Se ha realizado un pedido<h1><br/><p>Nombre: ${data.name}</p><p>Descripcion: ${data.feedbackType}</p><p>Numero: ${data.phone}</p><p>Email: ${data.email}</p><p>Llevar a: ${data.to_where}</p><p>La persona esta en: ${data.place}</p><p>Para quien es?: ${data.to_who}`
    fetch('https://dynapi-backend.dreamlopers.com/api/5b442c9b7abb1d02820a198f/emails?apiKey=G75BBt14ZyoLWyC5TM0QxAUXE2xjcDZfpG8Pp8ir', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({to, from, subject, body})
      })
  }
  render() {
    return (
        <Conversation
            onSubmit={this.sendData}
            chatOptions={{
              introText: 'Hola, Bienvenido a Veket. Te ayudaremos con el regalo perfecto para tu ser querido',
              submittedResponseText: 'Gracias, en minutos te contactáremos'
            }}
            onStep={this.setValue}
        >
            <Question id="name" >
              ¿Cómo te llamas?
            </Question>
            <Question id="email" validation={text => text.includes('@')}>
              {`¿Cuál es tu email?`}
            </Question>
            <Question id="place" >
              {`¿Dónde te encuentras?`}
            </Question>
            <Select id="feedbackType" question="Cuéntanos, ¿Qué regalo deseas hacer?">
                <Option value="issue">Una torta</Option>
                <Option value="typo">Flores</Option>
                <Option value="praise">Chocolates</Option>
                <Option value="other">Otra</Option>
            </Select>
            <Question id="to_who" >
              Perfecto, para quien es ese regalo?
            </Question>
            <Question id="to_where" >
              ¿A qué dirección que lo llevemos?
            </Question>
            <Question id="phone" >
              Por último, danos tu número de teléfono para contactarte por whatsapp
            </Question>
        </Conversation>
    )
  }
}
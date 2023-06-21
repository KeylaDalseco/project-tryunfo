import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = { // CRIANDO STATE PARA O COMPONENT PAI (DEVE SER CRIADO SEMPRE NO PAI)
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    stateSave: [], // UM LUGAR CRIADO PARA SALVAR OS DADOS DO INPUT
  };

  btnSave = (event) => { // CRIANDO FUNÇÃO PARA SALVAR OS DADOS DO INPUT
    event.preventDefault(); // TIRANDO O RECARREGAMENTO APÓS CLICAR NO BOTÃO PARA NÃO PERDER OS DADOS
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      hasTrunfo,
      cardTrunfo } = this.state;

    const card = { // CRIANDO UM OBJETO COM OS VALORES DO STATE QUE FOI DESESTRUTURADO ACIMA, PARA SALVAR NO STATESAVE
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState((prevs) => ({ // ADICIONANDO AS ALTERAÇÕES NO STATE APÓS CLICAR NO BOTÃO DE SALVAR, LIMPAR OS INPUTS
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: cardTrunfo || hasTrunfo, // ou prevs.cardTrunfo ? prevs.cardTrunfo : previuousState.hasTrunfo
      stateSave: [...prevs.stateSave, card], // AQUI CRIA UMA CÓPIA DO ARRAY DENTRO DO STATESAVE(...PREVS), E ADICIONA NO FINAL DELE O OBJETO CRIADO COM OS STATES
    }));
  };

  validationButton = () => { // FUNÇÃO DE VALIDAÇÃO DOS CAMPOS DE INPUT
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare } = this.state;

    const maxAttr = 90;
    const maxPointAttr = 210;

    const attr1 = Number(cardAttr1);
    const attr2 = Number(cardAttr2);
    const attr3 = Number(cardAttr3);

    const valueCardName = cardName.length > 0; // ARMAZENO AS CONDICIONAIS EM CONST PARA FAZER A ALTERAÇÃO NO SETSTATE
    const valueCardDescription = cardDescription.length > 0;
    const valueCardImage = cardImage.length > 0;
    const valueCardAttr1 = attr1 <= maxAttr && attr1 >= 0;
    const valueCardAttr2 = attr2 <= maxAttr && attr2 >= 0;
    const valueCardAttr3 = attr3 <= maxAttr && attr3 >= 0;
    const valueRare = cardRare.length > 0;
    const some = (attr1 + attr2 + attr3) <= maxPointAttr;

    this.setState({
      isSaveButtonDisabled: !(valueCardAttr1 // O BOTÃO ESTARÁ ABILITADO SE PASSAR EM TODAS AS CONDICIONAIS (ESTAVA TRUE DESABLE INICIALMENTE)
        && valueCardAttr2
        && valueCardAttr3
        && valueCardName
        && valueCardDescription
        && valueCardImage
        && valueRare
        && some
      ) });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validationButton, this.btnSave); // CHAMO A FUNÇÃO AQUI POR CONTA DO ASSINCRONISMO DO SETSTATE
  };

  btnRemove = (name) => { // botão que remove a card
    const { stateSave, hasTrunfo } = this.state;
    const validarHastrunfo = !hasTrunfo;
    const cardRemove = stateSave.filter((card) => card.cardName !== name); // filtro que trás somente as card que não possui aquele name
    this.setState({
      stateSave: cardRemove,
      hasTrunfo: validarHastrunfo, // adicionando state atualizado com o filter
    });
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      stateSave } = this.state;

    const cards = stateSave.map((card) => (
      <div key={ card.cardName }>
        <Card
          cardName={ card.cardName }
          cardDescription={ card.cardDescription }
          cardAttr1={ card.cardAttr1 }
          cardAttr2={ card.cardAttr2 }
          cardAttr3={ card.cardAttr3 }
          cardImage={ card.cardImage }
          cardRare={ card.cardRare }
          cardTrunfo={ card.cardTrunfo }
        />
        <button
          onClick={ () => this.btnRemove(card.cardName) } // função com callback por ter parametro
          data-testid="delete-button"
        >
          Excluir
        </button>
      </div>
    ));

    return (
      <div className="div__h1">
        <h1>Tryunfo</h1>
        <div className="div__pai">
          <div className="div__form">
            <h3>Adicione uma carta:</h3>
            <br />
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.btnSave }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              hasTrunfo={ hasTrunfo }
            />
          </div>
          <div className="div__card">
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              onInputChange={ this.onInputChange }
            />
          </div>
          <div className="div__card--render">
            { cards }
          </div>
        </div>
      </div>
    );
  }
}

export default App;

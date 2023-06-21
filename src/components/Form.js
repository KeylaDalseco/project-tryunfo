import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component { // COMPONENT CRIADO COM O FORM
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
      onSaveButtonClick,
      onInputChange,
    } = this.props; // SEMPRE QUE CRIAR PROPS DEVE SER REALIZADO O IMPORT PropTypes E CRIAR UM PADRÃO DOS VALORES CASO NECESSÁRIO
    const some = (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3));
    return (
      <form className="form__div--modifier">
        <div>
          <label>
            Nome:
            <input
              name="cardName" // O NAME DEVE SER IGUAL AO NOME PASSADO NO STATE
              type="text"
              data-testid="name-input"
              value={ cardName }
              onChange={ onInputChange } // FUNÇÃO QUE CRIA PARA TODOS OS INPUTS O STATE COM O NOME PASSADO NO INPUT TARGETADO E O VALOR ATUAL DELE
            />
          </label>
        </div>
        <div>
          <label>
            <p>Descrição da carta:</p>
            <textarea
              name="cardDescription"
              type="text"
              data-testid="description-input"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>
        </div>
        <div>
          <label>
            Atributo 1:
            <input
              name="cardAttr1"
              type="number"
              data-testid="attr1-input"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
        </div>
        <div>
          <label>
            Atributo 2:
            <input
              name="cardAttr2"
              type="number"
              data-testid="attr2-input"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>
        </div>
        <div>
          <label>
            Atributo 3:
            <input
              name="cardAttr3"
              type="number"
              data-testid="attr3-input"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>
        </div>
        { `Total atributos: ${some}`}
        <div>
          <br />
          <label>
            Imagem:
            <input
              name="cardImage"
              type="text"
              data-testid="image-input"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>
        </div>
        <div>
          <label>
            Raridade:
            <select
              name="cardRare"
              type="text"
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          { hasTrunfo === true ? <p>Você já tem um Super Trunfo em seu baralho</p> // VALIDAÇÃO PARA O BOTÃO DE SUPERTRUNFO DO CHECKBOX (SO PODERIA HAVER UMA)
            : (
              <div>
                <label>
                  Super Trunfo:
                  <input
                    name="cardTrunfo"
                    type="checkbox"
                    data-testid="trunfo-input"
                    checked={ cardTrunfo }
                    onChange={ onInputChange }
                  />
                </label>
              </div>)}
          <button
            name="isSaveButtonDisabled"
            className="button"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};

Form.defaultProps = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: '',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};

export default Form;

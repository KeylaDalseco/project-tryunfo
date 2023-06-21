import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component { // COMPONENT FILHO QUE CRIA O MODELO DA CARTA QUE QUERO TER, E ATUALIZA EM TEMPO REAL COM O QUE FOI DIGITADO NOS INPUTS
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
    } = this.props;
    return (
      <div>
        <h3 data-testid="name-card">{ cardName }</h3>
        <img
          data-testid="image-card"
          className="img"
          src={ cardImage }
          alt={ cardName }
        />
        <p data-testid="description-card">
          <strong>
            Descrição:
          </strong>
          <br />
          <i>{`${cardDescription}`}</i>
        </p>
        <br />
        <p data-testid="attr1-card">
          <strong>
            Attack 1:
          </strong>
          <i>{` ${cardAttr1}`}</i>
        </p>
        <p data-testid="attr2-card">
          <strong>
            Attack 2:
          </strong>
          <i>{` ${cardAttr2}`}</i>
        </p>
        <p data-testid="attr3-card">
          <strong>
            Attack 3:
          </strong>
          <i>{` ${cardAttr3}`}</i>
        </p>
        <br />
        <p data-testid="rare-card">
          <strong>
            Raridade:
          </strong>
          {` ${cardRare}`}
        </p>
        <br />
        {cardTrunfo ? <h2 data-testid="trunfo-card">Super Trunfo</h2> : false }
        {/* ^ VALIDAÇÃO PARA SABER SE A CARD VAI SER CARDTRUNFO, SE SIM ADIICONA O TEXTO */}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;

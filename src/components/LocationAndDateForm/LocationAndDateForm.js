import _ from 'lodash';
import React from 'react';
import './LocationAndDateForm.css';

class LocationAndDateForm extends React.Component {

    constructor (props) {
        super(props);
        this.fields = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    gatherData () {
        return _.mapValues(this.fields, 'value');
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.getSunActivity(this.gatherData());
    }

    renderInputError () {
        return (
            <div className="error">
                <p className="error__message">
                    Sorry, we can't find a location for that postcode. Please check your postcode is valid or try another.
                </p>
            </div>
        )
    }

    renderServiceError () {
        return (
            <div className="error">
                <p className="error__message">Please try again.</p>
            </div>
        )
    }

    handleError () {
        return this.props.error === 'NOT_FOUND' ? this.renderInputError() : this.renderServiceError();
    }

    render () {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <h2 className="form__header">Search for your sunrise and sunset times</h2>
                <fieldset className="form_fieldset">
                    <div className="field">
                        <label className="field__label" htmlFor="postcode">Postcode</label>
                        <input defaultValue=""
                               required={true}
                               type="text"
                               id="postcode"
                               className="field__input field__input--text"
                               maxLength={8}
                               ref={ (e) => this.fields.postcode = e } />
                    </div>
                    <div className="field">
                        <label className="field__label" htmlFor="date">Date</label>
                        <input defaultValue=""
                               required={true}
                               type="date"
                               id="date"
                               className="field__input field__input--date"
                               ref={ (e) => this.fields.date= e } />
                    </div>
                </fieldset>
                <footer className="footer">
                    { this.props.error && this.handleError() }
                    <button className="footer__button" type="submit">Find</button>
                </footer>
            </form>
        )
    }
}

export default LocationAndDateForm;
import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../components/card";
import FormGroup from "../components/formgroup";

class ConsultaLancamentos extends React.Component {
    render() {
        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup label="Ano: *" htmlFor="inputAno">
                                <input className="form-control" type="text" id="inputAno" name="ano" placeholder="Digite o ano"></input>
                            </FormGroup>

                            <FormGroup label="Mês: " htmlFor="inputMes">

                            </FormGroup>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)
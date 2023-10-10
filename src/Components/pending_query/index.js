import './style.scss';
import {useEffect} from "react";
import axiosFest from "../../Authentication";


const PendingQuery = props => {

    useEffect(() => {

        // GET PENDING
        axiosFest.get(`/participante/pagamentos/existem_pendentes`,
            {
                params: {
                    participante: email
                }
            }
        )
            .then(resultado => props.setPending(resultado.data.existem_pendentes))
            .catch(e => console.log("Erro", e));

    }, []);


    if (!props.pending) {
        return null;
    }

    return props.pending;
};

export default PendingQuery;
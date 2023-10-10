import './style.scss';
import {
    BttnLeftArrowActive,
    BttnLeftArrowGreyed,
    BttnRightArrowActive,
    BttnRightArrowGreyed
} from "../../Components/buttons";


const Pagination = props => {
    const {
        pagina,
        setPagina,
        numeroPaginas,
        single_page

    } = props;

    return <> {single_page
        ? null
        : <div className={"Pagination"}>
            <div className={"arrow-left"}>
                {pagina <= 0
                    ? <BttnLeftArrowGreyed/>
                    : <div onClick={() => setPagina(pagina - 1)}>
                        <BttnLeftArrowActive/>
                    </div>}
            </div>
            <div className={"arrow-right"}>
                {pagina >= numeroPaginas - 1
                    ? <BttnRightArrowGreyed/>
                    : <div onClick={() => setPagina(pagina + 1)}>
                        <BttnRightArrowActive/>
                    </div>}
            </div>
        </div>}
    </>;
};

export default Pagination;
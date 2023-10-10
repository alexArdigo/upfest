import './style.scss';
import SearchBar from "../../Components/search_bar";
import {useEffect, useState} from "react";
import axiosFest from "../../Authentication";
import {ListArtist, ListFestivalFavoutireBttn} from "../../Components/list_cards_festival";
import NavBar from "../../Components/nav_bar";
import Pagination from "../Pagination";


const Search = props => {
    const [futuros, setFuturos] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [filter, setFilter] = useState('');

    // PAGINAÇÃO
    const [numero_resultados, setNumero_resultados] = useState(3);
    // eventos
    const [paginaEventos, setPaginaEventos] = useState(0);
    const [numeroPaginasEventos, setNumeroPaginasEventos] = useState(0);
    const [totalPaginasEventos, setTotalPaginasEventos] = useState(0);
    // artistas
    const [paginaArtistas, setPaginaArtistas] = useState(0);
    const [numeroPaginasArtistas, setNumeroPaginasArtistas] = useState(0);
    const [totalPaginasArtistas, setTotalPaginasArtistas] = useState(0);


    useEffect(() => {
        setPaginaEventos(0);
        setPaginaArtistas(0);
    }, [filter]);


    useEffect(() => {
        axiosFest.get(`/evento/listar`,
            {
                params: {
                    apenas_futuros: 1,
                    pagina: paginaEventos,
                    numero_resultados: numero_resultados,
                    pesquisa: filter
                }
            }
        )
            .then(resultado => {
                setFuturos(resultado.data.eventos);
                setPaginaEventos(resultado.data.paginacao.pagina);
                setNumeroPaginasEventos(resultado.data.paginacao.paginas);
                setTotalPaginasEventos(resultado.data.paginacao.resultados);

            })
            .catch(e => console.log("Erro", e));

        axiosFest.get(`/artistas/listar`,
            {
                params: {
                    apenas_futuros: 1,
                    pagina: paginaArtistas,
                    numero_resultados: numero_resultados,
                    pesquisa: filter

                }
            }
        )
            .then(resultado => {
                setArtistas(resultado.data.artistas);
                setPaginaArtistas(resultado.data.paginacao.pagina);
                setNumeroPaginasArtistas(resultado.data.paginacao.paginas);
                setTotalPaginasArtistas(resultado.data.paginacao.resultados);
            })
            .catch(e => console.log("Erro", e));

    }, [filter, paginaEventos, paginaArtistas]);


    return <div className={"Search"}>
        <NavBar/>
        {/*{filter === '' ? */}<SearchBar setFilter={setFilter}/>
        <div>
            <h1 className={"h1-block-title"}>Festivais</h1>
            <>
                {futuros.map(el => <>

                        <ListFestivalFavoutireBttn
                            key={el.id}
                            id={el.id}
                            evento={el.designacao}
                            data={el.data}
                            local={el.local}
                            imagem={el.imagem}
                        />
                    </>
                )}
                <Pagination pagina={paginaEventos}
                            setPagina={setPaginaEventos}
                            numeroPaginas={numeroPaginasEventos}
                            single_page={totalPaginasEventos <= numero_resultados}
                />
            </>
        </div>
        <div>
            <h1 className={"h1-block-title"}>Artistas</h1>
            <>
                {artistas.map(el =>
                    <ListArtist
                        key={el.id}
                        id={el.id}
                        nome={el.nome}
                        imagem={el.imagem}
                    />)}
                <Pagination pagina={paginaArtistas}
                            setPagina={setPaginaArtistas}
                            numeroPaginas={numeroPaginasArtistas}
                            single_page={totalPaginasArtistas <= numero_resultados}

                />
            </>
        </div>
    </div>;
};

export default Search;
import './style.scss';

const SearchBar = props => {
    const {setFilter} = props;

    return <>
        <div className={"SearchBar border-circle"}>
            <input type="text" placeholder="Encontra um festival ou artista" onChange={(e) => {
                setFilter(e.target.value);
            }} className={"search-bar-box"}/>
        </div>
    </>;
};


export default SearchBar;

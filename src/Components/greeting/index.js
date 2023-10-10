const Greeting = () => {
    const date = new Date();
    const hours = date.getHours();
    let greet;

    if (hours < 12)
        greet = "Bom dia, ";
    else if (hours >= 12 && hours <= 17)
        greet = "Boa tarde, ";
    else if (hours >= 17 && hours <= 24)
        greet = "Boa noite ";

    return <span className={"h1-block-title"}>{greet}</span>;
};

export default Greeting;
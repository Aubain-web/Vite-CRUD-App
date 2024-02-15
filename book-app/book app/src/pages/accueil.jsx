import Head from "../header";

const Accueil = () => {
    const messageAccueil = "WELCOME TO OUR BOOK APP";
    const citation = "La lecture est l'une des meilleures voies vers l'empathie, une expérience qui nous permet de comprendre les expériences et les perspectives des autres. C'est une porte ouverte vers des mondes inconnus, des idées nouvelles, et une compréhension plus profonde de nous-mêmes et du monde qui nous entoure. Grâce à la lecture, nous pouvons voyager à travers le temps et l'espace, explorer des cultures différentes, et nous connecter avec des personnages et des idées qui nous inspirent et nous défient. C'est un voyage sans fin qui nourrit notre esprit, élargit notre vision du monde, et enrichit nos vies d'une manière inestimable.";
    const auteur = "Carl Sagan";

    return (
        <>
        <Head/>
        <div className="Accueil">
            <h1>{messageAccueil}</h1>
            <p>{citation}</p>
            <p>- {auteur}</p>
        </div>
        </>
    );
};

export default Accueil;

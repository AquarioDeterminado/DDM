import styles from "./GameDashBoard.module.css";
import {Bar, Pie} from "react-chartjs-2";
import {useEffect, useState} from "react";
import {getUsersByGender, getUsersByTime, getUsersByZone, getWinProbability, getMostWins, getLessWins} from "./../../../controllers/Statistics";

/**
 * Objetivos Estatistica:
 *  - Utilizadores por Zona (Gráfico de barras)
 *  - Nº uilixadore por tempo (Historograma)
 *  - Grafico circular genero
 *
 *  - Probabilidade de um utilizador ganhar um jogo
 *  - Jogador com mais vitorias (nome e quantidade) (fazer “a mão” Aka js)
 *  - Jogador com menos vitorias (nome e quantidade) (fazer “a mão” Aka js)
 */

function GameDashBoard() {

    const [usersByZone, setUsersByZone] = useState();
    const [usersByTime, setUsersByTime] = useState();
    const [usersByGender, setUsersByGender] = useState({
        labels: ["Masculino", "Feminino", "Outro"],
        datasets: [
            {
                label: "Genero",
                data: [0, 0, 0],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)"
                ]
            }]
    });
    const [winProbability, setWinProbability] = useState();
    const [mostWins, setMostWins] = useState();
    const [lessWins, setLessWins] = useState();



    useEffect(() => {
        getUsersByGender((data, status) => {
            if (status === 200) {
                setUsersByGender({
                    labels: ["Masculino", "Feminino", "Outro"],
                    datasets: [
                        {
                            label: "Genero",
                            data: data,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.6)",
                                "rgba(54, 162, 235, 0.6)",
                                "rgba(255, 206, 86, 0.6)"
                            ]
                        }]
                });
            }
        });

        getUsersByTime((data, status) => {
            if (status === 200) {
                setUsersByTime({
                    labels: data.map((item) => item.time),
                    datasets: [{
                        label: "Utilizadores",
                        data: data.map((item) => item.count),
                        backgroundColor: "rgba(255, 99, 132, 0.6)"
                    }]
                });
            }
        });

        getUsersByZone((data, status) => {
            if (status === 200) {
                setUsersByZone({
                    labels: Object.keys(data),
                    datasets: [{
                        label: "Utilizadores",
                        data: Object.values(data),
                        backgroundColor: "rgba(54, 162, 235, 0.6)"
                    }]

                });
            }
        });

        getWinProbability((data, status) => {
            if (status === 200) {
                setWinProbability(data);
            }
        });

        getMostWins((data, status) => {
            if (status === 200) {
                setMostWins(data);
            }
        });

        getLessWins((data, status) => {
            if (status === 200) {
                setLessWins(data);
            }
        });
    }, []);



    return (
        <>
            <Pie data={usersByGender}/>
            <Bar data={usersByZone}/>
            <Bar data={usersByTime} />

            <h1>Probabilidade de ganhar um jogo</h1>
            <p>{winProbability}</p>

            <h1>Jogador com mais vitorias</h1>
            <p>{mostWins}</p>

            <h1>Jogador com menos vitorias</h1>
            <p>{lessWins}</p>

        </>
    )
}


export default GameDashBoard;
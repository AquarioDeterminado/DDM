import styles from "./GameDashBoard.module.css";
import {Bar, Pie} from "react-chartjs-2";

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





    return (
        <>
            <div className={styles.graphics}>

            </div>
            <div className={styles.stats}>


            </div>
            
        </>
    )
}


export default GameDashBoard;
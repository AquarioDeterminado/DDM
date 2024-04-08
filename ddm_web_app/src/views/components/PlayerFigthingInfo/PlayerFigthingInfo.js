import INFO_STATUS from "../../../controllers/utils/InfoStatus";

function PlayerFigthingInfo(props) {
    const {playerInfo, styles} = props;
    return (
        <div className={styles.playerInfo}>
            <div className={styles.playerPhoto} >
                {opponentInfo.status === INFO_STATUS.READY ? playerInfo.opponent.photo : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                }
            </div>
            <h1>{ opponentInfo.status === INFO_STATUS.READY ? playerInfo.opponent.username : "ERROR"}</h1>
            <p>{opponentInfo.status === INFO_STATUS.READY ? playerInfo.opponent.hp : "ERROR"}</p>
        </div>
    )
}

export default PlayerFigthingInfo;
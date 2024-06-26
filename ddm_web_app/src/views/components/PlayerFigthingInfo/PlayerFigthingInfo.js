import INFO_STATUS from "../../../controllers/utils/InfoStatus";

function PlayerFigthingInfo(props) {
    const {playerInfo, styles} = props;
    return (
        <div className={styles.playerInfo}>
            <div className={styles.playerPhoto} >
                {playerInfo.status === INFO_STATUS.READY ? <div dangerouslySetInnerHTML={{__html: playerInfo.player.photo}}></div> :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                }
            </div>
            <h1>{playerInfo.status === INFO_STATUS.READY ? playerInfo.player.username : "Loading..."}</h1>
            <p>{playerInfo.status === INFO_STATUS.READY ? playerInfo.player.hp + " hp" : "Loading..."}</p>
        </div>
    )
}

export default PlayerFigthingInfo;
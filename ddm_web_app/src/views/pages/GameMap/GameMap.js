import styles from "./GameMap.module.css";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import CardHand from "../../components/CardHand/CardHand";

import {useEffect, useRef, useState} from "react";



function Map() {



    return (
        <div>
            Map
        </div>
    );
}

function GameMap() {
  return (
      <div className={styles.gameMap}>
          <div className={styles.profileButton}>
              <ProfileButton/>
          </div>
          {"Map"//TODO: Add Map Component
          }
          <div className={styles.cardHand}>
            <CardHand/>
          </div>
      </div>
  );
}

export default GameMap;
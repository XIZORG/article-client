import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAuthors } from "../../dal/server/authors-api";
import BlockUI from "../../utils/uiComponents/BlockUI/BlockUI";
import { useHistory } from "react-router";
import styles from "./style-authors.module.css";

const Authors = (props) => {
  const [authorState, setauthorState] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getAllAuthors().then((resp) => {
      const allAuthors = resp.data;
      setauthorState(allAuthors);
    });
  }, [setauthorState]);

  if (authorState === null) return <>Downloading...</>;

  return (
    <div className={styles.authorPage}>
      <div className={styles.authorWrapper}>
        {authorState.map((auhtor) => (
          <BlockUI
            imgUrl={
              "https://images.wallpaperscraft.ru/image/single/olen_minimalizm_fotoapparat_plastinka_audiokasseta_jo_jo_vektor_retro_99248_1280x720.jpg"
            }
            name={auhtor.name}
            className={styles.articleBlock}
            onClick={() => history.push(`/authors/show/${auhtor.id}`)}
            key={auhtor.id}
          />
        ))}
      </div>

      <button
        onClick={() => history.push("/authors/create")}
        className={styles.floatingButton}
      >
        create new
      </button>
    </div>
  );
};

export default Authors;

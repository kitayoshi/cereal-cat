import cx from "classnames";

import styles from "./ArtBox.module.css";

type ArtBoxProps = {
  className?: string;
  children?: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  cardLink?: string;
};

function ArtBox(props: ArtBoxProps) {
  const { className, children, title, description, link, cardLink } = props;

  return (
    <div className={cx(styles.container, className)}>
      <a href={link} target="_blank">
        {children}
      </a>
      <a href={cardLink} target="_blank" className={styles.card}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </a>
    </div>
  );
}

export default ArtBox;
